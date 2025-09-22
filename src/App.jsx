// // import { useState } from 'react'
// // import * as XLSX from 'xlsx'
// // import './App.css'
// // import namblue from './assets/img/namblue.png'
// // import { Image } from 'antd';

// // const thanhVien = [
// //   "Hữu Danh", "Thế Anh", "Trung Hiếu", "Minh Thuận", "Duy Nam",
// //   "Hải Quân", "Xuân Trường", "Gia Huy", "Thành Công", "Tuấn Tú", "Anh Khoa",
// //   "Công Lý", "Tấn Lộc", "Hoàng Phúc", "Trung Anh", "Minh Tú",
// //   "Thanh Phong", "Văn Lợi", "Minh Đức", "Minh Hiếu", "Đức Chung",
// //   "Thanh Hậu", "Tấn Đạt", "Hiền Minh"
// // ];

// // // Hàm lấy ngày đầu tuần (thứ 2) của tuần hiện tại
// // function getMonday(d = new Date()) {
// //   const date = new Date(d);
// //   const day = date.getDay();
// //   const diff = day === 0 ? -6 : 1 - day;
// //   date.setDate(date.getDate() + diff);
// //   return date;
// // }

// // // Hàm format ngày DD/MM/YYYY
// // function formatDate(date) {
// //   const d = date.getDate().toString().padStart(2, '0');
// //   const m = (date.getMonth() + 1).toString().padStart(2, '0');
// //   const y = date.getFullYear();
// //   return `${d}/${m}/${y}`;
// // }

// // // Tạo mảng days cho tuần hiện tại
// // const weekDays = [
// //   "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"
// // ];
// // const monday = getMonday();
// // const days = weekDays.map((label, i) => {
// //   const date = new Date(monday);
// //   date.setDate(monday.getDate() + i);
// //   return { label, date: formatDate(date) };
// // });

// // // Ca trực cho 4 và 6 ca
// // const caTimes4 = [
// //   "19h00 - 22h00",
// //   "22h00 - 1h00",
// //   "1h00 - 4h00",
// //   "4h00 - 6h30"
// // ];
// // const caTimes6 = [
// //   "19h00 - 20h30",
// //   "20h30 - 22h30",
// //   "22h30 - 00h30",
// //   "00h30 - 2h30",
// //   "2h30 - 4h30",
// //   "4h30 - 6h30"
// // ];

// // // Hàm shuffle mảng
// // function shuffle(array) {
// //   const arr = array.slice();
// //   for (let i = arr.length - 1; i > 0; i--) {
// //     const j = Math.floor(Math.random() * (i + 1));
// //     [arr[i], arr[j]] = [arr[j], arr[i]];
// //   }
// //   return arr;
// // }

// // // Sinh lịch trực cho 2 tuần, mỗi tuần chia nhóm xen kẽ, mỗi ngày random ca trực không lặp lại
// // function generateSchedule2Weeks(caType = 4) {
// //   const now = new Date();
// //   const firstMonday = getMonday(new Date(now.getFullYear(), 0, 1));
// //   const weekNum = Math.floor((monday - firstMonday) / (7 * 24 * 60 * 60 * 1000));
// //   let groupA = [];
// //   let groupB = [];
// //   if (localStorage.getItem('lich_truc_groupA') && localStorage.getItem('lich_truc_groupB')) {
// //     groupA = JSON.parse(localStorage.getItem('lich_truc_groupA'));
// //     groupB = JSON.parse(localStorage.getItem('lich_truc_groupB'));
// //   } else {
// //     const shuffled = shuffle(thanhVien);
// //     groupA = shuffled.slice(0, 12);
// //     groupB = shuffled.slice(12, 24);
// //     localStorage.setItem('lich_truc_groupA', JSON.stringify(groupA));
// //     localStorage.setItem('lich_truc_groupB', JSON.stringify(groupB));
// //   }

// //   const evenWeek = weekNum % 2 === 0;
// //   let caTimes = caType === 4 ? caTimes4 : caTimes6;
// //   let perCa = caType === 4 ? 3 : 2;
 
// //   const schedule = Array.from({ length: caTimes.length }, () =>
// //     Array.from({ length: days.length }, () => Array(perCa).fill(""))
// //   );

// //   for (let d = 0; d < days.length; d++) {
// //     const todayGroup = (evenWeek ? (d % 2 === 0 ? groupA : groupB) : (d % 2 === 0 ? groupB : groupA));
// //     const todayMembers = shuffle(todayGroup);
// //     for (let c = 0; c < caTimes.length; c++) {
// //       for (let k = 0; k < perCa; k++) {
// //         schedule[c][d][k] = todayMembers[c * perCa + k] || "";
// //       }
// //     }
// //   }
// //   return schedule;
// // }


// // function App() {
  

// //   // Đọc dữ liệu từ localStorage
// //   const getSavedData = () => {
// //     try {
// //       const schedule = localStorage.getItem('lich_truc_schedule');
// //       const caType = localStorage.getItem('lich_truc_caType');
// //       return {
// //         schedule: schedule ? JSON.parse(schedule) : null,
// //         caType: caType ? Number(caType) : 4
// //       };
// //     } catch {
// //       return { schedule: null, caType: 4 };
// //     }
// //   };

// //   // Khởi tạo state từ localStorage
// //   const savedData = getSavedData();
// //   const [schedule, setSchedule] = useState(savedData.schedule || generateSchedule2Weeks(savedData.caType));
// //   const [caType, setCaType] = useState(savedData.caType);

// //   // Modal Trung đội trưởng
// //   const [showLeader, setShowLeader] = useState(false);
// //   const handleShowLeader = () => setShowLeader(true);
// //   const handleHideLeader = () => setShowLeader(false);

// //   // Khi chọn loại ca, chỉ thay đổi state, chưa random lại lịch, và làm rỗng lịch trực
// //   const handleChangeCaType = (e) => {
// //     const newType = Number(e.target.value);
// //     setCaType(newType);
// //     // Tạo lịch rỗng với số ca và số người mỗi ca tương ứng
// //     const caTimes = newType === 4 ? caTimes4 : caTimes6;
// //     const perCa = newType === 4 ? 3 : 2;
// //     const emptySchedule = Array.from({ length: caTimes.length }, () =>
// //       Array.from({ length: days.length }, () => Array(perCa).fill(""))
// //     );
// //     setSchedule(emptySchedule);
// //   };

// //   // Khi random lại thì lưu lịch mới và loại ca vào localStorage
// //   const handleRandomize = () => {
// //     localStorage.removeItem('lich_truc_groupA');
// //     localStorage.removeItem('lich_truc_groupB');
// //     localStorage.setItem('lich_truc_caType', caType);
// //     const newSchedule = generateSchedule2Weeks(caType);
// //     setSchedule(newSchedule);
// //     localStorage.setItem('lich_truc_schedule', JSON.stringify(newSchedule));
// //   };

// //   // Xuất file Excel
// //   const caTimes = caType === 4 ? caTimes4 : caTimes6;
   
// //   const handleExportExcel = () => {
// //     const header = [
// //       ['CA TRỰC', 'Thời gian trực', ...days.map(d => `${d.label} ${d.date}`)]
// //     ];
// //     const rows = caTimes.map((ca, caIdx) => [
// //       `Ca ${caIdx + 1}`,
// //       ca,
// //       ...days.map((_, dayIdx) =>
// //         schedule[caIdx][dayIdx].map((name) => `- ${name}`).join('\n')
// //       )
// //     ]);
// //     const wsData = [...header, ...rows];
// //     const ws = XLSX.utils.aoa_to_sheet(wsData);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, 'LichTruc');
// //     XLSX.writeFile(wb, 'lich_truc.xlsx');
// //   };

// //   return (
// //     <>
// //       <div>
// //         <div>
// //           <h1 className="read-the-docs">
// //             <strong>Trung đội cơ động 2</strong>
// //           </h1>
// //           <div className="d-flex justify-content-center mb-3" style={{ gap: 8 }}>
// //             <select
// //               value={caType}
// //               onChange={handleChangeCaType}
// //               style={{ marginRight: 12, padding: '6px 12px', borderRadius: 4, fontWeight: 600 }}
// //             >
// //               {/* <option value={4}>4 ca trực/ngày (mỗi ca 3 người)</option> */}
// //               <option value={6}>6 ca trực/ngày (mỗi ca 2 người)</option>
// //             </select>
// //             <button className="btn-random" onClick={handleRandomize}>
// //               Sắp xếp ca trực ngẫu nhiên
// //             </button>
// //             <button className="btn-export" onClick={handleExportExcel} style={{ display: "none" }}>
// //               Xuất Excel
// //             </button>
// //             <button className="btn-leader" onClick={handleShowLeader}>
// //               Trung đội trưởng
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Hiển thị modal hoặc popup Trung đội trưởng */}
// //       {showLeader && (
// //         <div
// //           style={{
// //             position: 'fixed',
// //             top: 0, left: 0, right: 0, bottom: 0,
// //             background: 'rgba(0,0,0,0.3)',
// //             zIndex: 1000,
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center'
// //           }}
// //           onClick={handleHideLeader}
// //         >
// //           <div
// //             style={{
// //               background: '#fff',
// //               padding: 32,
// //               minWidth: 280,
// //               boxShadow: '0 4px 24px #0002',
// //               textAlign: 'center',
// //               position: 'relative',
// //               borderRadius: 12
// //             }}
// //             onClick={e => e.stopPropagation()}
// //           >
// //             <Image
// //               src={namblue}
// //               alt="Trung đội trưởng"
// //               width={120}
// //               height={120}
// //               style={{ borderRadius: '50%', marginBottom: 16, objectFit: 'cover', boxShadow: '0 2px 8px #aaa' }}
// //               preview={true}
// //             />
// //             <h3 style={{ margin: 0, marginBottom: 8 }}>Trung đội trưởng</h3>
// //             <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Nam Blue</div>
// //             <div style={{ color: '#555', fontSize: 15, marginBottom: 16 }}>SĐT: 0336662425</div>
// //             <button
// //               style={{
// //                 background: '#007bff',
// //                 color: '#fff',
// //                 border: 'none',
// //                 borderRadius: 4,
// //                 padding: '6px 18px',
// //                 fontWeight: 600,
// //                 cursor: 'pointer'
// //               }}
// //               onClick={handleHideLeader}
// //             >
// //               Đóng
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <h1> Thành viên nhóm trực </h1>

// //       {/* Liệt kê nhóm thành viên và nút copy */}
// //       <div style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '32px 0' }}>
// //         {/* Nhóm 1 */}
// //         <div style={{ flex: 1, background: '#f8f8f8', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #eee' }}>
// //           <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Nhóm 1</h4>
// //           <ul style={{ paddingLeft: 18, marginBottom: 12, listStyleType: 'none' }}>
// //             {JSON.parse(localStorage.getItem('lich_truc_groupB') || '[]').map((name, idx) => (
// //               <li key={idx} style={{ fontWeight: 500 }}>{name}</li>
// //             ))}
// //           </ul>
// //           <button
// //             className="btn-random"
// //             style={{ width: '100%' }}
// //             onClick={() => {
// //               const names = JSON.parse(localStorage.getItem('lich_truc_groupB') || '[]').join('\n');
// //               navigator.clipboard.writeText(names);
// //               alert('Đã sao chép nhóm 1');
// //             }}
// //           >
// //             Copy nhóm 1
// //           </button>
// //         </div>
// //         {/* Nhóm 2 */}
// //         <div style={{ flex: 1, background: '#f8f8f8', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #eee' }}>
// //           <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Nhóm 2</h4>
// //           <ul style={{ paddingLeft: 18, marginBottom: 12, listStyleType: 'none' }}>
// //             {JSON.parse(localStorage.getItem('lich_truc_groupA') || '[]').map((name, idx) => (
// //               <li key={idx} style={{ fontWeight: 500 }}>{name}</li>
// //             ))}
// //           </ul>
// //           <button
// //             className="btn-export"
// //             style={{ width: '100%' }}
// //             onClick={() => {
// //               const names = JSON.parse(localStorage.getItem('lich_truc_groupA') || '[]').join('\n');
// //               navigator.clipboard.writeText(names);
// //                alert('Đã sao chép nhóm 2');
// //             }}
// //           >
// //             Copy nhóm 2
// //           </button>
// //         </div>
// //       </div>

    
// //       <br /> <br /> <br /> <br />
// //       <div>
// //         <footer>
// //           <hr />
// //           <p style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
// //             &copy; 2025 - Bản quyền thuộc về: &nbsp;
// //             <a href="https://www.facebook.com/theanh24.it" target="_blank" rel="noopener noreferrer">Thế Anh</a>
// //           </p>
// //         </footer>
// //       </div>
// //     </>
// //   )
// // }

// // export default App


// import { useState } from 'react';
// import * as XLSX from 'xlsx';
// import './App.css';
// import namblue from './assets/img/namblue.png';
// import { Image } from 'antd';

// // Danh sách thành viên
// const thanhVien = [
//   "Hữu Danh", "Thế Anh", "Trung Hiếu", "Minh Thuận", "Duy Nam",
//   "Hải Quân", "Xuân Trường", "Gia Huy", "Thành Công", "Tuấn Tú", "Anh Khoa",
//   "Công Lý", "Tấn Lộc", "Hoàng Phúc", "Trung Anh", "Minh Tú",
//   "Thanh Phong", "Văn Lợi", "Minh Đức", "Minh Hiếu", "Đức Chung",
//   "Thanh Hậu", "Tấn Đạt", "Hiền Minh"
// ];

// // Hàm lấy ngày đầu tuần (thứ 2) của tuần hiện tại
// function getMonday(d = new Date()) {
//   const date = new Date(d);
//   const day = date.getDay();
//   const diff = day === 0 ? -6 : 1 - day;
//   date.setDate(date.getDate() + diff);
//   return date;
// }

// // Hàm format ngày DD/MM/YYYY
// function formatDate(date) {
//   const d = date.getDate().toString().padStart(2, '0');
//   const m = (date.getMonth() + 1).toString().padStart(2, '0');
//   const y = date.getFullYear();
//   return `${d}/${m}/${y}`;
// }

// // Tạo mảng days cho tuần hiện tại
// const weekDays = [
//   "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"
// ];
// const monday = getMonday();
// const days = weekDays.map((label, i) => {
//   const date = new Date(monday);
//   date.setDate(monday.getDate() + i);
//   return { label, date: formatDate(date) };
// });

// // Ca trực cho 4 và 6 ca
// const caTimes4 = [
//   "19h00 - 22h00",
//   "22h00 - 1h00",
//   "1h00 - 4h00",
//   "4h00 - 6h30"
// ];
// const caTimes6 = [
//   "19h00 - 20h30",
//   "20h30 - 22h30",
//   "22h30 - 00h30",
//   "00h30 - 2h30",
//   "2h30 - 4h30",
//   "4h30 - 6h30"
// ];

// // Hàm shuffle mảng
// function shuffle(array) {
//   const arr = array.slice();
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }

// // Sinh lịch trực cho 2 tuần, mỗi tuần chia nhóm xen kẽ, mỗi ngày random ca trực không lặp lại
// function generateSchedule2Weeks(caType = 4) {
//   const now = new Date();
//   const firstMonday = getMonday(new Date(now.getFullYear(), 0, 1));
//   const weekNum = Math.floor((monday - firstMonday) / (7 * 24 * 60 * 60 * 1000));
//   let groupA = [];
//   let groupB = [];
//   if (localStorage.getItem('lich_truc_groupA') && localStorage.getItem('lich_truc_groupB')) {
//     groupA = JSON.parse(localStorage.getItem('lich_truc_groupA'));
//     groupB = JSON.parse(localStorage.getItem('lich_truc_groupB'));
//   } else {
//     const shuffled = shuffle(thanhVien);
//     groupA = shuffled.slice(0, 12);
//     groupB = shuffled.slice(12, 24);
//     localStorage.setItem('lich_truc_groupA', JSON.stringify(groupA));
//     localStorage.setItem('lich_truc_groupB', JSON.stringify(groupB));
//   }

//   const evenWeek = weekNum % 2 === 0;
//   let caTimes = caType === 4 ? caTimes4 : caTimes6;
//   let perCa = caType === 4 ? 3 : 2;

//   const schedule = Array.from({ length: caTimes.length }, () =>
//     Array.from({ length: days.length }, () => Array(perCa).fill(""))
//   );

//   for (let d = 0; d < days.length; d++) {
//     const todayGroup = (evenWeek ? (d % 2 === 0 ? groupA : groupB) : (d % 2 === 0 ? groupB : groupA));
//     const todayMembers = shuffle(todayGroup);
//     for (let c = 0; c < caTimes.length; c++) {
//       for (let k = 0; k < perCa; k++) {
//         schedule[c][d][k] = todayMembers[c * perCa + k] || "";
//       }
//     }
//   }
//   return schedule;
// }

// function App() {
//   // Đọc dữ liệu từ localStorage
//   const getSavedData = () => {
//     try {
//       const schedule = localStorage.getItem('lich_truc_schedule');
//       const caType = localStorage.getItem('lich_truc_caType');
//       return {
//         schedule: schedule ? JSON.parse(schedule) : null,
//         caType: caType ? Number(caType) : 4
//       };
//     } catch {
//       return { schedule: null, caType: 4 };
//     }
//   };

//   // Khởi tạo state từ localStorage
//   const savedData = getSavedData();
//   const [schedule, setSchedule] = useState(savedData.schedule || generateSchedule2Weeks(savedData.caType));
//   const [caType, setCaType] = useState(savedData.caType);
//   const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading

//   // Modal Trung đội trưởng
//   const [showLeader, setShowLeader] = useState(false);
//   const handleShowLeader = () => setShowLeader(true);
//   const handleHideLeader = () => setShowLeader(false);

//   // Khi chọn loại ca, chỉ thay đổi state, chưa random lại lịch, và làm rỗng lịch trực
//   const handleChangeCaType = (e) => {
//     const newType = Number(e.target.value);
//     setCaType(newType);
//     const caTimes = newType === 4 ? caTimes4 : caTimes6;
//     const perCa = newType === 4 ? 3 : 2;
//     const emptySchedule = Array.from({ length: caTimes.length }, () =>
//       Array.from({ length: days.length }, () => Array(perCa).fill(""))
//     );
//     setSchedule(emptySchedule);
//   };

//   // Hàm xử lý khi nhấn nút random, thêm loading
//   const handleRandomize = () => {
//     setIsLoading(true); // Bật trạng thái loading
//     localStorage.removeItem('lich_truc_groupA');
//     localStorage.removeItem('lich_truc_groupB');
//     localStorage.setItem('lich_truc_caType', caType);

//     // Giả lập thời gian chờ 2 giây
//     setTimeout(() => {
//       const newSchedule = generateSchedule2Weeks(caType);
//       setSchedule(newSchedule);
//       localStorage.setItem('lich_truc_schedule', JSON.stringify(newSchedule));
//       setIsLoading(false); // Tắt trạng thái loading
//     }, 2000);
//   };

//   // Xuất file Excel
//   const caTimes = caType === 4 ? caTimes4 : caTimes6;
//   const handleExportExcel = () => {
//     const header = [
//       ['CA TRỰC', 'Thời gian trực', ...days.map(d => `${d.label} ${d.date}`)]
//     ];
//     const rows = caTimes.map((ca, caIdx) => [
//       `Ca ${caIdx + 1}`,
//       ca,
//       ...days.map((_, dayIdx) =>
//         schedule[caIdx][dayIdx].map((name) => `- ${name}`).join('\n')
//       )
//     ]);
//     const wsData = [...header, ...rows];
//     const ws = XLSX.utils.aoa_to_sheet(wsData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'LichTruc');
//     XLSX.writeFile(wb, 'lich_truc.xlsx');
//   };

//   return (
//     <>
//       <div>
//         <div>
//           <h1 className="read-the-docs">
//             <strong>Trung đội cơ động 2</strong>
//           </h1>
//           <div className="d-flex justify-content-center mb-3" style={{ gap: 8 }}>
//             <select
//               value={caType}
//               onChange={handleChangeCaType}
//               style={{ marginRight: 12, padding: '6px 12px', borderRadius: 4, fontWeight: 600 }}
//             >
//               <option value={4}>4 ca trực/ngày (mỗi ca 3 người)</option>
//               <option value={6}>6 ca trực/ngày (mỗi ca 2 người)</option>
//             </select>
//             <button className="btn-random" onClick={handleRandomize}>
//               Sắp xếp ca trực ngẫu nhiên
//             </button>
//             <button className="btn-export" onClick={handleExportExcel} style={{ display: "none" }}>
//               Xuất Excel
//             </button>
//             <button className="btn-leader" onClick={handleShowLeader}>
//               Trung đội trưởng
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal Trung đội trưởng */}
//       {showLeader && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0, left: 0, right: 0, bottom: 0,
//             background: 'rgba(0,0,0,0.3)',
//             zIndex: 1000,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}
//           onClick={handleHideLeader}
//         >
//           <div
//             style={{
//               background: '#fff',
//               padding: 32,
//               minWidth: 280,
//               boxShadow: '0 4px 24px #0002',
//               textAlign: 'center',
//               position: 'relative',
//               borderRadius: 12
//             }}
//             onClick={e => e.stopPropagation()}
//           >
//             <Image
//               src={namblue}
//               alt="Trung đội trưởng"
//               width={120}
//               height={120}
//               style={{ borderRadius: '50%', marginBottom: 16, objectFit: 'cover', boxShadow: '0 2px 8px #aaa' }}
//               preview={true}
//             />
//             <h3 style={{ margin: 0, marginBottom: 8 }}>Trung đội trưởng</h3>
//             <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Nam Blue</div>
//             <div style={{ color: '#555', fontSize: 15, marginBottom: 16 }}>SĐT: 0336662425</div>
//             <button
//               style={{
//                 background: '#007bff',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 4,
//                 padding: '6px 18px',
//                 fontWeight: 600,
//                 cursor: 'pointer'
//               }}
//               onClick={handleHideLeader}
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}

//       <h1>Thành viên nhóm trực</h1>

//       {/* Hiển thị loading hoặc danh sách nhóm */}
//       {isLoading ? (
//         <div style={{ textAlign: 'center', padding: '32px 0' }}>
        
// <div class="loader">
//   <span style="--d:100ms">l</span>
//   <span style="--d:250ms">o</span>
//   <span style="--d:400ms">a</span>
//   <span style="--d:550ms">d</span>
//   <span style="--d:700ms">i</span>
//   <span style="--d:850ms">n</span>
//   <span style="--d:1000ms">g</span>
// </div>
//             </div>
//       ) : (
//         <div style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '32px 0' }}>
//           {/* Nhóm 1 */}
//           <div style={{ flex: 1, background: '#f8f8f8', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #eee' }}>
//             <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Nhóm 1</h4>
//             <ul style={{ paddingLeft: 18, marginBottom: 12, listStyleType: 'none' }}>
//               {JSON.parse(localStorage.getItem('lich_truc_groupB') || '[]').map((name, idx) => (
//                 <li key={idx} style={{ fontWeight: 500 }}>{name}</li>
//               ))}
//             </ul>
//             <button
//               className="btn-random"
//               style={{ width: '100%' }}
//               onClick={() => {
//                 const names = JSON.parse(localStorage.getItem('lich_truc_groupB') || '[]').join('\n');
//                 navigator.clipboard.writeText(names);
//                 alert('Đã sao chép nhóm 1');
//               }}
//             >
//               Copy nhóm 1
//             </button>
//           </div>
//           {/* Nhóm 2 */}
//           <div style={{ flex: 1, background: '#f8f8f8', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #eee' }}>
//             <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Nhóm 2</h4>
//             <ul style={{ paddingLeft: 18, marginBottom: 12, listStyleType: 'none' }}>
//               {JSON.parse(localStorage.getItem('lich_truc_groupA') || '[]').map((name, idx) => (
//                 <li key={idx} style={{ fontWeight: 500 }}>{name}</li>
//               ))}
//             </ul>
//             <button
//               className="btn-export"
//               style={{ width: '100%' }}
//               onClick={() => {
//                 const names = JSON.parse(localStorage.getItem('lich_truc_groupA') || '[]').join('\n');
//                 navigator.clipboard.writeText(names);
//                 alert('Đã sao chép nhóm 2');
//               }}
//             >
//               Copy nhóm 2
//             </button>
//           </div>
//         </div>
//       )}

//       <br /> <br /> <br /> <br />
//       <div>
//         <footer>
//           <hr />
//           <p style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
//             &copy; 2025 - Bản quyền thuộc về: &nbsp;
//             <a href="https://www.facebook.com/theanh24.it" target="_blank" rel="noopener noreferrer">Thế Anh</a>
//           </p>
//         </footer>
//       </div>
//     </>
//   );
// }

// export default App;

import { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';
import namblue from './assets/img/namblue.png';
import { Image } from 'antd';

// Danh sách thành viên
const thanhVien = [
  "Hữu Danh", "Thế Anh", "Trung Hiếu", "Minh Thuận", "Duy Nam",
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

// Ca trực cho 4 và 6 ca
const caTimes4 = [
  "19h00 - 22h00",
  "22h00 - 1h00",
  "1h00 - 4h00",
  "4h00 - 6h30"
];
const caTimes6 = [
  "19h00 - 20h30",
  "20h30 - 22h30",
  "22h30 - 00h30",
  "00h30 - 2h30",
  "2h30 - 4h30",
  "4h30 - 6h30"
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

// Sinh lịch trực cho 2 tuần, mỗi tuần chia nhóm xen kẽ, mỗi ngày random ca trực không lặp lại
function generateSchedule2Weeks(caType = 4) {
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
  let caTimes = caType === 4 ? caTimes4 : caTimes6;
  let perCa = caType === 4 ? 3 : 2;

  const schedule = Array.from({ length: caTimes.length }, () =>
    Array.from({ length: days.length }, () => Array(perCa).fill(""))
  );

  for (let d = 0; d < days.length; d++) {
    const todayGroup = (evenWeek ? (d % 2 === 0 ? groupA : groupB) : (d % 2 === 0 ? groupB : groupA));
    const todayMembers = shuffle(todayGroup);
    for (let c = 0; c < caTimes.length; c++) {
      for (let k = 0; k < perCa; k++) {
        schedule[c][d][k] = todayMembers[c * perCa + k] || "";
      }
    }
  }
  return schedule;
}

function App() {
  // Đọc dữ liệu từ localStorage
  const getSavedData = () => {
    try {
      const schedule = localStorage.getItem('lich_truc_schedule');
      const caType = localStorage.getItem('lich_truc_caType');
      return {
        schedule: schedule ? JSON.parse(schedule) : null,
        caType: caType ? Number(caType) : 4
      };
    } catch {
      return { schedule: null, caType: 4 };
    }
  };

  // Khởi tạo state từ localStorage
  const savedData = getSavedData();
  const [schedule, setSchedule] = useState(savedData.schedule || generateSchedule2Weeks(savedData.caType));
  const [caType, setCaType] = useState(savedData.caType);
  const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading

  // Modal Trung đội trưởng
  const [showLeader, setShowLeader] = useState(false);
  const handleShowLeader = () => setShowLeader(true);
  const handleHideLeader = () => setShowLeader(false);

  // Khi chọn loại ca, chỉ thay đổi state, chưa random lại lịch, và làm rỗng lịch trực
  const handleChangeCaType = (e) => {
    const newType = Number(e.target.value);
    setCaType(newType);
    const caTimes = newType === 4 ? caTimes4 : caTimes6;
    const perCa = newType === 4 ? 3 : 2;
    const emptySchedule = Array.from({ length: caTimes.length }, () =>
      Array.from({ length: days.length }, () => Array(perCa).fill(""))
    );
    setSchedule(emptySchedule);
  };

  // Hàm xử lý khi nhấn nút random, thêm loading
  const handleRandomize = () => {
    setIsLoading(true); // Bật trạng thái loading
    localStorage.removeItem('lich_truc_groupA');
    localStorage.removeItem('lich_truc_groupB');
    localStorage.setItem('lich_truc_caType', caType);

    // Giả lập thời gian chờ 2 giây
    setTimeout(() => {
      const newSchedule = generateSchedule2Weeks(caType);
      setSchedule(newSchedule);
      localStorage.setItem('lich_truc_schedule', JSON.stringify(newSchedule));
      setIsLoading(false); // Tắt trạng thái loading
    }, 2000);
  };

  // Xuất file Excel
  const caTimes = caType === 4 ? caTimes4 : caTimes6;
  const handleExportExcel = () => {
    const header = [
      ['CA TRỰC', 'Thời gian trực', ...days.map(d => `${d.label} ${d.date}`)]
    ];
    const rows = caTimes.map((ca, caIdx) => [
      `Ca ${caIdx + 1}`,
      ca,
      ...days.map((_, dayIdx) =>
        schedule[caIdx][dayIdx].map((name) => `- ${name}`).join('\n')
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
      <div>
        <div>
          <h1 className="read-the-docs">
            <strong>Trung đội cơ động 2</strong>
          </h1>
          <div className="d-flex justify-content-center mb-3" style={{ gap: 8 }}>
            <select
              value={caType}
              onChange={handleChangeCaType}
              style={{ marginRight: 12, padding: '6px 12px', borderRadius: 4, fontWeight: 600 }}
            >
              <option value={4}>4 ca trực/ngày (mỗi ca 3 người)</option>
              <option value={6}>6 ca trực/ngày (mỗi ca 2 người)</option>
            </select>
            <button className="btn-random" onClick={handleRandomize}>
              Sắp xếp ca trực ngẫu nhiên
            </button>
            <button className="btn-export" onClick={handleExportExcel} style={{ display: "none" }}>
              Xuất Excel
            </button>
            <button className="btn-leader" onClick={handleShowLeader}>
              Trung đội trưởng
            </button>
          </div>
        </div>
      </div>

      {/* Modal Trung đội trưởng */}
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
              position: 'relative',
              borderRadius: 12
            }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={namblue}
              alt="Trung đội trưởng"
              width={120}
              height={120}
              style={{ borderRadius: '50%', marginBottom: 16, objectFit: 'cover', boxShadow: '0 2px 8px #aaa' }}
              preview={true}
            />
            <h3 style={{ margin: 0, marginBottom: 8 }}>Trung đội trưởng</h3>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Nam Blue</div>
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

      <h1>Thành viên nhóm trực</h1>

      {/* Hiển thị loading hoặc danh sách nhóm */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '32px 0', display: 'flex', justifyContent: 'center' }}>
          <div className="loader">
            <span style={{ '--d': '100ms' }}>Đ</span>
            <span style={{ '--d': '250ms' }}>A</span>
            <span style={{ '--d': '400ms' }}>N</span>
            <span style={{ '--d': '550ms' }}>G</span>
            <span style={{ '--d': '700ms' }}>X</span>
            <span style={{ '--d': '850ms' }}>Ế</span>
            <span style={{ '--d': '1000ms' }}>P</span>
            <span style={{ '--d': '1150ms' }}>N</span>
            <span style={{ '--d': '1300ms' }}>G</span>
            <span style={{ '--d': '1450ms' }}>Ư</span>
            <span style={{ '--d': '1600ms' }}>Ờ</span>
            <span style={{ '--d': '1750ms' }}>I</span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '32px 0' }}>
          {/* Nhóm 1 */}
          <div style={{ flex: 1, background: '#f8f8f8', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #eee' }}>
            <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Nhóm 1</h4>
            <ul style={{ paddingLeft: 18, marginBottom: 12, listStyleType: 'none' }}>
              {JSON.parse(localStorage.getItem('lich_truc_groupB') || '[]').map((name, idx) => (
                <li key={idx} style={{ fontWeight: 500 }}>{name}</li>
              ))}
            </ul>
            <button
              className="btn-random"
              style={{ width: '100%' }}
              onClick={() => {
                const names = JSON.parse(localStorage.getItem('lich_truc_groupB') || '[]').join('\n');
                navigator.clipboard.writeText(names);
                alert('Đã sao chép nhóm 1');
              }}
            >
              Copy nhóm 1
            </button>
          </div>
          {/* Nhóm 2 */}
          <div style={{ flex: 1, background: '#f8f8f8', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #eee' }}>
            <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Nhóm 2</h4>
            <ul style={{ paddingLeft: 18, marginBottom: 12, listStyleType: 'none' }}>
              {JSON.parse(localStorage.getItem('lich_truc_groupA') || '[]').map((name, idx) => (
                <li key={idx} style={{ fontWeight: 500 }}>{name}</li>
              ))}
            </ul>
            <button
              className="btn-export"
              style={{ width: '100%' }}
              onClick={() => {
                const names = JSON.parse(localStorage.getItem('lich_truc_groupA') || '[]').join('\n');
                navigator.clipboard.writeText(names);
                alert('Đã sao chép nhóm 2');
              }}
            >
              Copy nhóm 2
            </button>
          </div>
        </div>
      )}

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
  );
}

export default App;