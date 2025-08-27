import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import './App.css'

const nhom1 = [
  "Đức Quy", "Thế Anh", "Trung Hiếu", "Minh Thuận", "Duy Nam",
  "Hải Quân", "Xuân Trường", "Gia Huy", "Thành Công", "Tuấn Tú", "Anh Khoa"
];
const nhom2 = [
  "Công Lý", "Tấn Lộc", "Hoàng Phúc", "Trung Anh", "Minh Tú",
  "Thanh Phong", "Văn Lợi", "Minh Đức", "Minh Hiếu", "Đức Chung",
  "Thanh Hậu", "Tấn Đạt", "Hiền Minh"
];

// Hàm lấy ngày đầu tuần (thứ 2) của tuần hiện tại
function getMonday(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Nếu chủ nhật thì lùi 6 ngày, còn lại lùi về thứ 2
  date.setDate(date.getDate() + diff);
  return date;
}

// Hàm format ngày DD/MM/YYYY
function formatDate(date) {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

// Tạo mảng days cho tuần hiện tại
const weekDays = [
  "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"
];
const monday = getMonday();
const days = weekDays.map((label, i) => {
  const date = new Date(monday);
  date.setDate(monday.getDate() + i);
  return { label, date: formatDate(date) };
});
const caTimes = [
  "19h00 - 22h00",
  "22h00 - 1h00",
  "1h00 - 4h00",
  "4h00 - 6h30"
];

// Hàm shuffle mảng
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Lấy danh sách blacklist từ localStorage (những người đã từng trực 3 ca)
function getBlacklist(key) {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch {}
  return [];
}

// Lưu blacklist vào localStorage
function saveBlacklist(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

// Hàm xếp ca tự động, có random, mỗi người chỉ trực 1 ca/ngày
function generateScheduleRandom() {
  // Lấy blacklist tuần trước
  const blacklist1 = getBlacklist('blacklist1');
  const blacklist2 = getBlacklist('blacklist2');

  // Đếm số ca đã phân cho mỗi người trong tuần
  const count1 = Object.fromEntries(nhom1.map(n => [n, 0]));
  const count2 = Object.fromEntries(nhom2.map(n => [n, 0]));
  count1["Tuấn Tú"] = 0;
  count1["Gia Huy"] = 0;

  // Kết quả: [ca][ngày] = [người nhóm 1, người nhóm 2]
  const schedule = Array.from({ length: caTimes.length }, () =>
    Array.from({ length: days.length }, () => ["", ""])
  );

  // Lưu lại ai đã trực trong ngày đó
  for (let d = 0; d < days.length; d++) {
    let available1 = nhom1.filter(n => !blacklist1.includes(n));
    let available2 = nhom2.filter(n => !blacklist2.includes(n));
    available1 = shuffle(available1);
    available2 = shuffle(available2);
    let used1 = new Set();
    let used2 = new Set();

    for (let c = 0; c < 3; c++) {
      let n1 = available1.find(
        n =>
          !used1.has(n) &&
          ((n === "Tuấn Tú" || n === "Gia Huy") ? count1[n] < 4 : count1[n] < 2)
      );
      if (!n1) {
        n1 = nhom1.find(
          n =>
            !used1.has(n) &&
            ((n === "Tuấn Tú" || n === "Gia Huy") ? count1[n] < 4 : count1[n] < 2)
        );
      }
      if (!n1) n1 = "";
      used1.add(n1);
      count1[n1] = (count1[n1] || 0) + 1;

      let n2 = available2.find(n => !used2.has(n) && count2[n] < 2);
      if (!n2) {
        n2 = nhom2.find(n => !used2.has(n) && count2[n] < 2);
      }
      if (!n2) n2 = "";
      used2.add(n2);
      count2[n2] = (count2[n2] || 0) + 1;

      schedule[c][d] = [n1, n2];
    }

    // Ca 4: Tuấn Tú hoặc Gia Huy (tăng ca), vẫn đảm bảo không trùng trong ngày
    let n1 = d % 2 === 0 ? "Tuấn Tú" : "Gia Huy";
    if (!used1.has(n1) && count1[n1] < 4) {
      used1.add(n1);
      count1[n1]++;
    } else {
      n1 = n1 === "Tuấn Tú" ? "Gia Huy" : "Tuấn Tú";
      if (!used1.has(n1) && count1[n1] < 4) {
        used1.add(n1);
        count1[n1]++;
      } else {
        n1 = nhom1.find(
          n =>
            !used1.has(n) &&
            ((n === "Tuấn Tú" || n === "Gia Huy") ? count1[n] < 4 : count1[n] < 2)
        ) || "";
        if (n1) {
          used1.add(n1);
          count1[n1]++;
        }
      }
    }

    let n2 = available2.find(n => !used2.has(n) && count2[n] < 2);
    if (!n2) {
      n2 = nhom2.find(n => !used2.has(n) && count2[n] < 2);
    }
    if (!n2) n2 = "";
    if (n2) {
      used2.add(n2);
      count2[n2]++;
    }
    schedule[3][d] = [n1, n2];
  }

  // Sau khi xếp xong, kiểm tra ai bị thiếu ca (chỉ có 1 ca hoặc 0 ca)
  // và ai bị dư ca (chỉ có 1 ca trống trong lịch)
  // Đếm số ca đã phân
  let needFill1 = [];
  let needFill2 = [];
  let fillCount1 = 0, fillCount2 = 0;

  // Tìm số ca thiếu của mỗi nhóm
  let total1 = Object.values(count1).reduce((a, b) => a + b, 0);
  let total2 = Object.values(count2).reduce((a, b) => a + b, 0);
  let missing1 = days.length * caTimes.length - total1;
  let missing2 = days.length * caTimes.length - total2;

  // Chọn random những người có 2 ca để lấp vào ca thiếu
  if (missing1 > 0) {
    let canFill1 = nhom1.filter(n => count1[n] === 2 && n !== "Tuấn Tú" && n !== "Gia Huy");
    canFill1 = shuffle(canFill1).slice(0, missing1);
    canFill1.forEach(n => count1[n]++);
    needFill1 = canFill1;
  }
  if (missing2 > 0) {
    let canFill2 = nhom2.filter(n => count2[n] === 2);
    canFill2 = shuffle(canFill2).slice(0, missing2);
    canFill2.forEach(n => count2[n]++);
    needFill2 = canFill2;
  }

  // Lấp ca thiếu vào lịch
  for (let c = 0; c < caTimes.length; c++) {
    for (let d = 0; d < days.length; d++) {
      // Nhóm 1
      if (!schedule[c][d][0]) {
        let n = needFill1[fillCount1++];
        // Nếu vẫn thiếu, chọn bất kỳ ai chưa trực ca đó trong ngày
        if (!n) {
          // Ưu tiên người có 2 ca, chưa trực trong ngày đó
          let usedInDay = new Set(schedule.map(row => row[d][0]));
          n = nhom1.find(
            x => !usedInDay.has(x) && ((x === "Tuấn Tú" || x === "Gia Huy") ? count1[x] < 4 : count1[x] < 3)
          );
          // Nếu vẫn không có, chọn bất kỳ ai
          if (!n) n = nhom1.find(x => !usedInDay.has(x));
        }
        schedule[c][d][0] = n || "";
      }
      // Nhóm 2
      if (!schedule[c][d][1]) {
        let n = needFill2[fillCount2++];
        if (!n) {
          let usedInDay = new Set(schedule.map(row => row[d][1]));
          n = nhom2.find(
            x => !usedInDay.has(x) && count2[x] < 3
          );
          if (!n) n = nhom2.find(x => !usedInDay.has(x));
        }
        schedule[c][d][1] = n || "";
      }
    }
  }

  // Lưu vào localStorage để tuần sau không bị lặp lại
  saveBlacklist('blacklist1', needFill1);
  saveBlacklist('blacklist2', needFill2);

  return schedule;
}

function App() {
  // Đọc lịch từ localStorage nếu có, nếu không thì tạo mới
  const getSavedSchedule = () => {
    try {
      const data = localStorage.getItem('lich_truc_schedule');
      if (data) return JSON.parse(data);
    } catch {}
    return null;
  };

  const [schedule, setSchedule] = useState(() => {
    const saved = getSavedSchedule();
    return saved || generateScheduleRandom();
  });

  // Khi lần đầu load, nếu chưa có lịch thì lưu lại
  useEffect(() => {
    if (!getSavedSchedule()) {
      localStorage.setItem('lich_truc_schedule', JSON.stringify(schedule));
    }
    // eslint-disable-next-line
  }, []);

  // Khi random lại thì lưu lịch mới vào localStorage
  const handleRandomize = () => {
    const newSchedule = generateScheduleRandom();
    setSchedule(newSchedule);
    localStorage.setItem('lich_truc_schedule', JSON.stringify(newSchedule));
  };

  // Xuất file Excel
  const handleExportExcel = () => {
    const header = [
      ['CA TRỰC', 'Thời gian trực', ...days.map(d => `${d.label} ${d.date}`)]
    ];
    const rows = caTimes.map((ca, caIdx) => [
      `Ca ${caIdx + 1}`,
      ca,
      ...days.map((_, dayIdx) =>
        `- ${schedule[caIdx][dayIdx][0]}\n- ${schedule[caIdx][dayIdx][1]}`
      )
    ]);
    const wsData = [...header, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'LichTruc');
    XLSX.writeFile(wb, 'lich_truc.xlsx');
  };

  return (
    <>
      <h1 className="read-the-docs">
        Đổi ca trực tự động
      </h1>
      <div className="d-flex justify-content-center mb-3" style={{gap: 8}}>
        <button className="btn-random" onClick={handleRandomize}>
          Sắp xếp ca trực ngẫu nhiên
        </button>
        <button className="btn-export" onClick={handleExportExcel}>
          Xuất Excel
        </button>
      </div>
      <div className="table-container">
        <table className="shift-table">
          <thead>
            <tr>
              <th rowSpan={2} className="header-yellow">CA TRỰC</th>
              <th rowSpan={2} className="header-yellow">Thời gian trực</th>
              {days.map((d, i) =>
                <th key={i} className="header-yellow">{d.label}<br />{d.date}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {caTimes.map((ca, caIdx) => (
              <tr key={caIdx}>
                <td>{`Ca ${caIdx + 1}`}</td>
                <td>{ca}</td>
                {days.map((_, dayIdx) => (
                  <td key={dayIdx}>
                    - {schedule[caIdx][dayIdx][0]} <br/>
                    - {schedule[caIdx][dayIdx][1]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
