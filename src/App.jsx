import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import './App.css'
import namblue from './assets/img/namblue.png'
const thanhVien = [
  "Đức Quy", "Thế Anh", "Trung Hiếu", "Minh Thuận", "Duy Nam",
  "Hải Quân", "Xuân Trường", "Gia Huy", "Thành Công", "Tuấn Tú", "Anh Khoa",
  "Công Lý", "Tấn Lộc", "Hoàng Phúc", "Trung Anh", "Minh Tú",
  "Thanh Phong", "Văn Lợi", "Minh Đức", "Minh Hiếu", "Đức Chung",
  "Thanh Hậu", "Tấn Đạt", "Hiền Minh"
];

// Hàm lấy ngày đầu tuần (thứ 2) của tuần hiện tại
function getMonday(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
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

// Sinh lịch trực cho 2 tuần, mỗi tuần 12 người xen kẽ, mỗi ngày random ca trực không lặp lại
function generateSchedule2Weeks() {
  const now = new Date();
  const firstMonday = getMonday(new Date(now.getFullYear(), 0, 1));
  const weekNum = Math.floor((monday - firstMonday) / (7 * 24 * 60 * 60 * 1000));
  let groupA = [];
  let groupB = [];
  if (localStorage.getItem('lich_truc_groupA') && localStorage.getItem('lich_truc_groupB')) {
    groupA = JSON.parse(localStorage.getItem('lich_truc_groupA'));
    groupB = JSON.parse(localStorage.getItem('lich_truc_groupB'));
  } else {
    const shuffled = shuffle(thanhVien);
    groupA = shuffled.slice(0, 12);
    groupB = shuffled.slice(12, 24);
    localStorage.setItem('lich_truc_groupA', JSON.stringify(groupA));
    localStorage.setItem('lich_truc_groupB', JSON.stringify(groupB));
  }

  const evenWeek = weekNum % 2 === 0;
  // Mỗi ca 3 người
  const schedule = Array.from({ length: caTimes.length }, () =>
    Array.from({ length: days.length }, () => ["", "", ""])
  );

  for (let d = 0; d < days.length; d++) {
    const todayGroup = (evenWeek ? (d % 2 === 0 ? groupA : groupB) : (d % 2 === 0 ? groupB : groupA));
    // Random lại thứ tự thành viên mỗi ngày để chia ca ngẫu nhiên, không lặp lại trong ngày
    const todayMembers = shuffle(todayGroup);
    for (let c = 0; c < caTimes.length; c++) {
      schedule[c][d][0] = todayMembers[c * 3] || "";
      schedule[c][d][1] = todayMembers[c * 3 + 1] || "";
      schedule[c][d][2] = todayMembers[c * 3 + 2] || "";
    }
  }
  return schedule;
}
function useMobileLandscapeAlert() {
  useEffect(() => {
    function checkMobileAndOrientation() {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isMobile && isPortrait) {
        alert('Vui lòng xoay ngang màn hình để xem bảng trực rõ hơn!');
      }
    }
    checkMobileAndOrientation();
    window.addEventListener('resize', checkMobileAndOrientation);
    return () => window.removeEventListener('resize', checkMobileAndOrientation);
  }, []);
}
function App() {
  useMobileLandscapeAlert();

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
    return saved || generateSchedule2Weeks();
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
    // Xóa nhóm cũ để random lại nhóm mới cho 2 tuần tiếp theo
    localStorage.removeItem('lich_truc_groupA');
    localStorage.removeItem('lich_truc_groupB');
    const newSchedule = generateSchedule2Weeks();
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
        `- ${schedule[caIdx][dayIdx][0]}\n- ${schedule[caIdx][dayIdx][1]}\n- ${schedule[caIdx][dayIdx][2]}`
      )
    ]);
    const wsData = [...header, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'LichTruc');
    XLSX.writeFile(wb, 'lich_truc.xlsx');
  };

  //` Modal Trung đội trưởng

  const [showLeader, setShowLeader] = useState(false);

  const handleShowLeader = () => setShowLeader(true);
  const handleHideLeader = () => setShowLeader(false);

  return (
    <>
      <div >
        <div>
          <h1 className="read-the-docs">
            <strong>Trung đội cơ động 2</strong>
          </h1>
          <div className="d-flex justify-content-center mb-3" style={{ gap: 8 }}>
            <button className="btn-random" onClick={handleRandomize}>
              Sắp xếp ca trực ngẫu nhiên
            </button>
            <button className="btn-export" onClick={handleExportExcel}>
              Xuất Excel
            </button>
            <button className="btn-leader" onClick={handleShowLeader}>
              Trung đội trưởng
            </button>
          </div>
        </div>
         
      </div>

      {/* Hiển thị modal hoặc popup Trung đội trưởng */}
      {showLeader && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleHideLeader}
        >
          <div
            style={{
              background: '#fff',
              padding: 32,
            
              minWidth: 280,
              boxShadow: '0 4px 24px #0002',
              textAlign: 'center',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <img src={namblue} alt="Trung đội trưởng" length="100" height= "100"  style={{  marginBottom: 16 }} />
            <h3 style={{ margin: 0, marginBottom: 8 }}>Trung đội trưởng</h3>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}> Nam Blue</div>
            <div style={{ color: '#555', fontSize: 15, marginBottom: 16 }}>SĐT: 0336662425</div>
            <button
              style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '6px 18px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={handleHideLeader}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
 {/* Hiển thị modal hoặc popup Trung đội trưởng */}
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
                    - {schedule[caIdx][dayIdx][0]} <br />
                    - {schedule[caIdx][dayIdx][1]} <br />
                    - {schedule[caIdx][dayIdx][2]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br /> <br /> <br /> <br />
      <div>
        <footer>
          <hr />
          <p style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
            &copy; 2025 - Bản quyền thuộc về: &nbsp;
            <a href="https://www.facebook.com/theanh24.it" target="_blank" rel="noopener noreferrer">Thế Anh</a>
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
