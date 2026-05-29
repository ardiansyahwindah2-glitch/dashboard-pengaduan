import { useState, useEffect } from 'react'

function Modal({ show, onClose, children }) {
  return show ? (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  ) : null
}

function Toast({ toast }) {
  return toast ? (
    <div className="fixed left-1/2 top-4 z-[100] -translate-x-1/2 animate-fade-up">
      <div className={`flex items-center gap-2 rounded-xl px-5 py-3 shadow-2xl backdrop-blur-xl ${
        toast.type === 'success' ? 'bg-green-600/90 text-white' : 'bg-red-600/90 text-white'
      }`}>
        {toast.type === 'success' ? (
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span className="text-sm font-semibold">{toast.msg}</span>
      </div>
    </div>
  ) : null
}

function App() {
  const [nis, setNis] = useState('')
  const [nama, setNama] = useState('')
  const [kelas, setKelas] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)
  const [adminUser, setAdminUser] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [pengaduanList, setPengaduanList] = useState([])
  const [fasilitas, setFasilitas] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [foto, setFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState('')
  const [toast, setToast] = useState(null)
  const [search, setSearch] = useState('')
  const [jam, setJam] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [editFasilitas, setEditFasilitas] = useState('')
  const [editDeskripsi, setEditDeskripsi] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [adminPage, setAdminPage] = useState('dashboard')
  const [dataFilter, setDataFilter] = useState('semua')
  const [showDetail, setShowDetail] = useState(null)
  const [appSettings, setAppSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('appSettings')) || { namaSekolah: 'SMA Negeri 1 Cimahi', emailSekolah: 'sman1cimahi@sch.id' } } catch { return { namaSekolah: 'SMA Negeri 1 Cimahi', emailSekolah: 'sman1cimahi@sch.id' } }
  })
  const [detailBalasan, setDetailBalasan] = useState('')
  const [detailPetugas, setDetailPetugas] = useState('')
  const [detailFotoSebelum, setDetailFotoSebelum] = useState(null)
  const [detailFotoSebelumPreview, setDetailFotoSebelumPreview] = useState('')
  const [detailFotoSesudah, setDetailFotoSesudah] = useState(null)
  const [detailFotoSesudahPreview, setDetailFotoSesudahPreview] = useState('')
  const [studentDetail, setStudentDetail] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('pengaduan')
    if (saved) {
      try { setPengaduanList(JSON.parse(saved)) } catch {}
    } else {
      const dummy = [
        { id: 1, nama: 'Ahmad Fauzi', nis: '12345', kelas: 'X IPA 1', fasilitas: 'Kelas', deskripsi: 'AC di ruang kelas rusak dan tidak dingin, sudah seminggu tidak diperbaiki. Suhu di kelas sangat panas sehingga mengganggu proses belajar mengajar.', foto: null, status: 'Diproses', tanggal: '28 Mei 2026', petugas: 'Bpk. Dedi', balasan: 'Sedang dalam penanganan teknisi AC.', fotoSebelum: null, fotoSesudah: null },
        { id: 2, nama: 'Siti Nurhaliza', nis: '12346', kelas: 'XI IPA 2', fasilitas: 'Toilet', deskripsi: 'Toilet lantai 2 kotor dan bau, air tidak mengalir sejak 3 hari lalu. Mohon segera diperbaiki karena sangat mengganggu kenyamanan.', foto: null, status: 'Menunggu', tanggal: '29 Mei 2026', petugas: '', balasan: '', fotoSebelum: null, fotoSesudah: null },
        { id: 3, nama: 'Budi Santoso', nis: '12347', kelas: 'XII IPS 1', fasilitas: 'Perpustakaan', deskripsi: 'Buku-buku referensi untuk persiapan ujian kurang lengkap, terutama untuk mata pelajaran matematika dan fisika.', foto: null, status: 'Selesai', tanggal: '25 Mei 2026', petugas: 'Ibu Sari', balasan: 'Buku sudah ditambah. Silakan cek ke perpustakaan.', fotoSebelum: null, fotoSesudah: null },
        { id: 4, nama: 'Dewi Lestari', nis: '12348', kelas: 'X IPA 2', fasilitas: 'Kantin', deskripsi: 'Kantin sekolah banyak makanan yang tidak higienis. Beberapa teman saya sakit setelah jajan di kantin.', foto: null, status: 'Ditolak', tanggal: '24 Mei 2026', petugas: '', balasan: 'Laporan sudah ditindaklanjuti ke UKS.', fotoSebelum: null, fotoSesudah: null },
        { id: 5, nama: 'Rudi Hermawan', nis: '12349', kelas: 'XI IPS 1', fasilitas: 'Lab Komputer', deskripsi: 'Lab komputer hanya ada 10 unit yang berfungsi dari 20 unit. Siswa jadi bergantian dan waktu praktek jadi terbatas.', foto: null, status: 'Menunggu', tanggal: '29 Mei 2026', petugas: '', balasan: '', fotoSebelum: null, fotoSesudah: null },
        { id: 6, nama: 'Ahmad Fauzi', nis: '12345', kelas: 'X IPA 1', fasilitas: 'Lapangan', deskripsi: 'Lapangan basket tidak ada penerangan, jadi tidak bisa dipakai untuk latihan sore.', foto: null, status: 'Selesai', tanggal: '27 Mei 2026', petugas: 'Bpk. Dedi', balasan: 'Lampu penerangan sudah dipasang.', fotoSebelum: null, fotoSesudah: null },
      ]
      setPengaduanList(dummy)
      localStorage.setItem('pengaduan', JSON.stringify(dummy))
    }
  }, [])

  useEffect(() => {
    if (pengaduanList.length > 0) {
      localStorage.setItem('pengaduan', JSON.stringify(pengaduanList))
    }
  }, [pengaduanList])

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(appSettings))
  }, [appSettings])

  useEffect(() => {
    if (!nis) { setNama(''); setKelas(''); return }
    const found = pengaduanList.find(p => p.nis === nis)
    if (found) { setNama(found.nama); setKelas(found.kelas) } else { setNama(''); setKelas('') }
  }, [nis, pengaduanList])

  useEffect(() => {
    const update = () => setJam(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function handleLogin(e) {
    e.preventDefault()
    if (nis && nama && kelas) setLoggedIn(true)
  }

  function handleAdminLogin(e) {
    e.preventDefault()
    if (adminUser === 'admin' && adminPass === 'sarpras123') {
      setAdminLoggedIn(true)
      setShowAdmin(false)
    }
  }

  function handleTambahPengaduan(e) {
    e.preventDefault()
    if (!fasilitas || !deskripsi) return
    setShowModal(true)
  }

  function confirmSubmit() {
    setShowModal(false)
    setPengaduanList([
      {
        id: Date.now(),
        nama,
        nis,
        kelas,
        fasilitas,
        deskripsi,
        foto: fotoPreview || null,
        status: 'Menunggu',
        tanggal: new Date().toLocaleDateString('id-ID'),
        petugas: '',
        balasan: '',
        fotoSebelum: null,
        fotoSesudah: null,
      },
      ...pengaduanList,
    ])
    setFasilitas('')
    setDeskripsi('')
    setFoto(null)
    setFotoPreview('')
    showToast('Aspirasi berhasil dikirim!')
  }

  function openEdit(p) {
    setEditItem(p)
    setEditFasilitas(p.fasilitas)
    setEditDeskripsi(p.deskripsi)
    setShowEditModal(true)
  }

  function confirmEdit() {
    if (!editFasilitas || !editDeskripsi) return
    setPengaduanList(pengaduanList.map(item =>
      item.id === editItem.id ? { ...item, fasilitas: editFasilitas, deskripsi: editDeskripsi } : item
    ))
    setShowEditModal(false)
    setEditItem(null)
    showToast('Aspirasi berhasil diubah!')
  }

  function openDelete(id) {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  function confirmDelete() {
    setPengaduanList(pengaduanList.filter(item => item.id !== deleteId))
    setShowDeleteModal(false)
    setDeleteId(null)
    showToast('Aspirasi berhasil dihapus!')
  }

  function openDetail(p) {
    setEditItem(p)
    setDetailBalasan(p.balasan || '')
    setDetailPetugas(p.petugas || '')
    setDetailFotoSebelum(null)
    setDetailFotoSebelumPreview('')
    setDetailFotoSesudah(null)
    setDetailFotoSesudahPreview('')
    setShowDetail(p)
  }

  function confirmDetail() {
    setPengaduanList(pengaduanList.map(item =>
      item.id === showDetail.id ? {
        ...item,
        petugas: detailPetugas,
        balasan: detailBalasan,
        fotoSebelum: detailFotoSebelumPreview || item.fotoSebelum,
        fotoSesudah: detailFotoSesudahPreview || item.fotoSesudah,
      } : item
    ))
    setShowDetail(null)
    showToast('Data penanganan berhasil disimpan!')
  }

  function statusColor(s) {
    if (s === 'Selesai') return 'border-green-300 bg-green-50 text-green-700 focus:ring-green-400'
    if (s === 'Ditolak') return 'border-red-300 bg-red-50 text-red-700 focus:ring-red-400'
    if (s === 'Diproses') return 'border-blue-300 bg-blue-50 text-blue-700 focus:ring-blue-400'
    return 'border-gray-300 bg-gray-50 text-gray-700 focus:ring-gray-400'
  }

  function badgeColor(s) {
    if (s === 'Selesai') return 'bg-green-100 text-green-700 shadow-green-500/10'
    if (s === 'Ditolak') return 'bg-red-100 text-red-700 shadow-red-500/10'
    if (s === 'Diproses') return 'bg-blue-100 text-blue-700 shadow-blue-500/10'
    return 'bg-gray-100 text-gray-700 shadow-gray-500/10'
  }

  function dotColor(s) {
    if (s === 'Selesai') return 'bg-green-500'
    if (s === 'Ditolak') return 'bg-red-500'
    if (s === 'Diproses') return 'bg-blue-500'
    return 'bg-gray-400'
  }

  if (adminLoggedIn) {
    const menu = [
      { key: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { key: 'data', label: 'Data Pengaduan', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { key: 'pengguna', label: 'Pengguna', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
      { key: 'setting', label: 'Setting', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ]
    const siswaList = [...new Map(pengaduanList.map(p => [p.nis, { nis: p.nis, nama: p.nama, kelas: p.kelas }])).values()]
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 bg-dot-grid flex">
        <aside className="hidden w-64 shrink-0 border-r border-white/20 bg-white/70 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="flex items-center gap-3 border-b border-white/20 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Admin Panel</h1>
              <p className="text-[10px] text-gray-500">{appSettings.namaSekolah}</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {menu.map(m => (
              <button
                key={m.key}
                onClick={() => setAdminPage(m.key)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  adminPage === m.key
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                }`}
              >
                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                </svg>
                {m.label}
              </button>
            ))}
          </nav>
          <div className="border-t border-white/20 px-4 py-3">
            <div className="mb-2 text-center text-xs text-gray-400">{jam}</div>
            <button onClick={() => setAdminLoggedIn(false)} className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50">
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h1 className="text-sm font-bold text-gray-900">Admin Panel</h1>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={adminPage}
                  onChange={e => setAdminPage(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                >
                  {menu.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                </select>
                <button onClick={() => setAdminLoggedIn(false)} className="rounded-lg bg-gradient-to-r from-red-500 to-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-red-500/30">
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 animate-page-enter">
            {adminPage === 'dashboard' && (
              <>
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.05s' }}>
                    <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-blue-500/5" />
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total</p>
                         <p className="text-xl font-bold text-gray-900">{pengaduanList.length}</p>
                       </div>
                     </div>
                   </div>
                   <div className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                     <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-gray-500/5" />
                     <div className="flex items-center gap-3">
                       <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gray-500 to-slate-600 shadow-sm">
                         <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-xs text-gray-500">Menunggu</p>
                         <p className="text-xl font-bold text-gray-700">{pengaduanList.filter(p => p.status === 'Menunggu').length}</p>
                       </div>
                     </div>
                   </div>
                   <div className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.15s' }}>
                     <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-yellow-500/5" />
                     <div className="flex items-center gap-3">
                       <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 shadow-sm">
                         <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-xs text-gray-500">Diproses</p>
                         <p className="text-xl font-bold text-yellow-600">{pengaduanList.filter(p => p.status === 'Diproses').length}</p>
                       </div>
                     </div>
                   </div>
                   <div className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
                     <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-green-500/5" />
                     <div className="flex items-center gap-3">
                       <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm">
                         <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-xs text-gray-500">Selesai</p>
                         <p className="text-xl font-bold text-green-600">{pengaduanList.filter(p => p.status === 'Selesai').length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-6 shadow-md shadow-gray-200/50 animate-fade-up" style={{ animationDelay: '0.25s' }}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Distribusi Status</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Menunggu', count: pengaduanList.filter(p => p.status === 'Menunggu').length, color: 'bg-gray-500' },
                        { label: 'Diproses', count: pengaduanList.filter(p => p.status === 'Diproses').length, color: 'bg-yellow-500' },
                        { label: 'Selesai', count: pengaduanList.filter(p => p.status === 'Selesai').length, color: 'bg-green-500' },
                        { label: 'Ditolak', count: pengaduanList.filter(p => p.status === 'Ditolak').length, color: 'bg-red-500' },
                      ].map(s => {
                        const max = pengaduanList.length || 1
                        return (
                          <div key={s.label}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="text-gray-600">{s.label}</span>
                              <span className="font-semibold text-gray-900">{s.count}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-100">
                              <div className={`h-2 rounded-full ${s.color} transition-all duration-500`} style={{ width: `${(s.count / max) * 100}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-6 shadow-md shadow-gray-200/50 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Laporan Per Fasilitas</h3>
                    {(() => {
                      const fasilitasList = [...new Set(pengaduanList.map(p => p.fasilitas))]
                      const max = Math.max(...fasilitasList.map(f => pengaduanList.filter(p => p.fasilitas === f).length), 1)
                      return fasilitasList.length === 0 ? (
                        <p className="text-sm text-gray-400">Belum ada data</p>
                      ) : (
                        <div className="space-y-2.5">
                          {fasilitasList.map(f => {
                            const count = pengaduanList.filter(p => p.fasilitas === f).length
                            const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500', 'bg-rose-500', 'bg-lime-500', 'bg-amber-500']
                            return (
                              <div key={f}>
                                <div className="mb-0.5 flex items-center justify-between text-xs">
                                  <span className="text-gray-600">{f}</span>
                                  <span className="font-semibold text-gray-900">{count}</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100">
                                  <div className={`h-1.5 rounded-full ${colors[fasilitasList.indexOf(f) % colors.length]} transition-all duration-500`} style={{ width: `${(count / max) * 100}%` }} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })()}
                  </div>
                </div>
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-6 shadow-md shadow-gray-200/50 animate-fade-up" style={{ animationDelay: '0.35s' }}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
                    {pengaduanList.length === 0 ? (
                      <p className="text-sm text-gray-400">Belum ada aktivitas</p>
                    ) : (
                      <div className="space-y-3">
                        {pengaduanList.slice(0, 5).map(p => (
                          <div key={p.id} className="flex items-start gap-3 text-sm">
                            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${dotColor(p.status)}`} />
                            <div className="min-w-0 flex-1">
                              <p className="text-gray-900 truncate"><span className="font-medium">{p.nama}</span> melaporkan {p.fasilitas}</p>
                              <p className="text-xs text-gray-400">{p.tanggal} &middot; {p.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="rounded-xl bg-white p-6 shadow-md shadow-gray-200/50 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Ringkasan Cepat</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                        <span className="text-sm text-gray-600">Total Pengguna</span>
                        <span className="text-sm font-bold text-gray-900">{siswaList.length} siswa</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                        <span className="text-sm text-gray-600">Pengaduan Hari Ini</span>
                        <span className="text-sm font-bold text-gray-900">{pengaduanList.filter(p => p.tanggal === new Date().toLocaleDateString('id-ID')).length} laporan</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                        <span className="text-sm text-gray-600">Tingkat Penyelesaian</span>
                        <span className="text-sm font-bold text-green-600">{pengaduanList.length > 0 ? Math.round((pengaduanList.filter(p => p.status === 'Selesai').length / pengaduanList.length) * 100) : 0}%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                        <span className="text-sm text-gray-600">Fasilitas Terbanyak</span>
                        <span className="text-sm font-bold text-gray-900">
                          {(() => {
                            const f = [...new Set(pengaduanList.map(p => p.fasilitas))]
                            if (!f.length) return '-'
                            return f.reduce((a, b) => pengaduanList.filter(p => p.fasilitas === a).length > pengaduanList.filter(p => p.fasilitas === b).length ? a : b)
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {adminPage === 'data' && (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Data Pengaduan</h2>
                  <div className="relative">
                    <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm shadow-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 sm:w-64"
                      placeholder="Cari pengaduan..."
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['semua', 'Menunggu', 'Diproses', 'Selesai', 'Ditolak'].map(s => (
                    <button
                      key={s}
                      onClick={() => setDataFilter(s)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                        dataFilter === s
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-white text-gray-600 shadow-sm border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {s === 'semua' ? 'Semua' : s}
                    </button>
                  ))}
                </div>
                {(() => {
                  const filtered = pengaduanList.filter(p => {
                    if (dataFilter !== 'semua' && p.status !== dataFilter) return false
                    if (search && !p.fasilitas.toLowerCase().includes(search.toLowerCase()) && !p.deskripsi.toLowerCase().includes(search.toLowerCase()) && !p.nama.toLowerCase().includes(search.toLowerCase())) return false
                    return true
                  })
                  return filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-gray-900">Tidak Ditemukan</h3>
                      <p className="mt-1 text-sm text-gray-500">Tidak ada pengaduan yang sesuai filter.</p>
                    </div>
                  ) : (
                    filtered.map((p) => {
                      const locked = p.status === 'Selesai'
                      return (
                        <div key={p.id} className={`rounded-xl bg-white p-5 shadow-md shadow-gray-200/50 transition-all duration-200 ${locked ? 'opacity-75' : ''}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openDetail(p)}>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                                <span className="font-medium text-gray-500">{p.nama}</span>
                                <span>&middot;</span>
                                <span>{p.kelas}</span>
                              </div>
                              <h3 className="font-semibold text-gray-900">{p.fasilitas}</h3>
                              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{p.deskripsi}</p>
                              {p.foto && <img src={p.foto} alt="Bukti" className="mt-2 h-20 w-28 rounded-lg object-cover shadow-sm" />}
                              <p className="mt-2 text-xs text-gray-400">{p.tanggal}</p>
                              {p.petugas && (
                                <p className="mt-1 text-xs text-blue-600 font-medium flex items-center gap-1">
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  Petugas: {p.petugas}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                value={p.status}
                                disabled={locked}
                                onChange={(e) => {
                                  setPengaduanList(pengaduanList.map((item) =>
                                    item.id === p.id ? { ...item, status: e.target.value } : item
                                  ))
                                }}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 ${statusColor(p.status)} ${locked ? 'cursor-not-allowed opacity-60' : ''}`}
                              >
                                <option value="Menunggu">Menunggu</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Ditolak">Ditolak</option>
                              </select>
                              {!locked && (
                                <>
                                  <button onClick={() => openEdit(p)} className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-400 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button onClick={() => openDelete(p.id)} className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-400 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </>
                              )}
                              {locked && (
                                <span className="flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700">
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                  Terkunci
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )
                })()}
              </div>
            )}

            {adminPage === 'pengguna' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Data Pengguna</h2>
                {siswaList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-gray-900">Belum Ada Pengguna</h3>
                    <p className="mt-1 text-sm text-gray-500">Belum ada siswa yang menggunakan aplikasi.</p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {siswaList.map(s => (
                      <div key={s.nis} className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
                            {s.nama.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{s.nama}</p>
                            <p className="text-xs text-gray-400">{s.kelas} &middot; NIS: {s.nis}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400">
                          <span>Total aspirasi: {pengaduanList.filter(p => p.nis === s.nis).length}</span>
                          <span className="font-medium text-blue-600">{pengaduanList.filter(p => p.nis === s.nis && p.status === 'Selesai').length} selesai</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {adminPage === 'setting' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Setting</h2>

                <div className="rounded-xl bg-white p-6 shadow-md shadow-gray-200/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Pengaturan Aplikasi</h3>
                      <p className="text-xs text-gray-500">Konfigurasi umum aplikasi</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                      <input
                        type="text"
                        value={appSettings.namaSekolah}
                        onChange={e => setAppSettings(prev => ({ ...prev, namaSekolah: e.target.value }))}
                        className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-all duration-200 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Sekolah</label>
                      <input
                        type="email"
                        value={appSettings.emailSekolah}
                        onChange={e => setAppSettings(prev => ({ ...prev, emailSekolah: e.target.value }))}
                        className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-all duration-200 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-md shadow-gray-200/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/20">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Informasi Aplikasi</h3>
                      <p className="text-xs text-gray-500">Detail teknis dan statistik</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Total Pengaduan</p>
                        <p className="text-xs text-gray-400">{pengaduanList.length} pengaduan tercatat</p>
                      </div>
                      <span className="rounded-lg bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">Online</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Penyimpanan</p>
                        <p className="text-xs text-gray-400">Data disimpan di localStorage browser</p>
                      </div>
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">Lokal</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Dibuat Dengan</p>
                        <p className="text-xs text-gray-400">Vite + React + Tailwind CSS</p>
                      </div>
                      <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">Frontend</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-md shadow-gray-200/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Data & Penyimpanan</h3>
                      <p className="text-xs text-gray-500">Kelola data pengaduan</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => {
                      const blob = new Blob([JSON.stringify(pengaduanList, null, 2)], { type: 'application/json' })
                      const a = document.createElement('a')
                      a.href = URL.createObjectURL(blob)
                      a.download = `data-pengaduan-${new Date().toISOString().slice(0, 10)}.json`
                      a.click()
                      showToast('Data berhasil diunduh!')
                    }} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Data
                    </button>
                    <button onClick={() => {
                      if (confirm('Yakin ingin menghapus semua data?')) {
                        setPengaduanList([])
                        localStorage.removeItem('pengaduan')
                        showToast('Semua data berhasil dihapus!', 'error')
                      }
                    }} className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 hover:scale-[1.02] active:scale-[0.98]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus Semua Data
                    </button>
                    <button onClick={() => {
                      if (confirm('Reset ke data awal?')) {
                        localStorage.removeItem('pengaduan')
                        window.location.reload()
                      }
                    }} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Data
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Edit Aspirasi</h3>
              <p className="text-sm text-gray-500">Ubah fasilitas atau deskripsi</p>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fasilitas</label>
              <select
                value={editFasilitas}
                onChange={e => setEditFasilitas(e.target.value)}
                className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              >
                <option>Kelas</option>
                <option>Toilet</option>
                <option>Lab Komputer</option>
                <option>Lab IPA</option>
                <option>Perpustakaan</option>
                <option>Kantin</option>
                <option>Lapangan</option>
                <option>Mushola</option>
                <option>Parkiran</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                value={editDeskripsi}
                onChange={e => setEditDeskripsi(e.target.value)}
                rows={4}
                className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 resize-none"
              />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setShowEditModal(false)} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100">
              Batal
            </button>
            <button onClick={confirmEdit} className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]">
              Simpan
            </button>
          </div>
        </Modal>

        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Hapus Aspirasi</h3>
              <p className="text-sm text-gray-500">Yakin ingin menghapus aspirasi ini?</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setShowDeleteModal(false)} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100">
              Batal
            </button>
            <button onClick={confirmDelete} className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98]">
              Hapus
            </button>
          </div>
        </Modal>

        <Modal show={showDetail} onClose={() => setShowDetail(null)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
              <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Detail Penanganan</h3>
              <p className="text-sm text-gray-500">Kelola tindak lanjut pengaduan</p>
            </div>
          </div>
          <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
            <div className="rounded-xl bg-gray-50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pelapor</span>
                <span className="font-semibold text-gray-900">{showDetail?.nama} ({showDetail?.nis})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Kelas</span>
                <span className="font-semibold text-gray-900">{showDetail?.kelas}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fasilitas</span>
                <span className="font-semibold text-gray-900">{showDetail?.fasilitas}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tanggal</span>
                <span className="font-semibold text-gray-900">{showDetail?.tanggal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${badgeColor(showDetail?.status)}`}>{showDetail?.status}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Deskripsi</p>
                <p className="text-sm text-gray-900">{showDetail?.deskripsi}</p>
              </div>
              {showDetail?.foto && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Foto Bukti</p>
                  <img src={showDetail.foto} alt="Bukti" className="h-32 w-32 rounded-xl object-cover shadow-md" />
                </div>
              )}
              {showDetail?.fotoSebelum && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Foto Sebelum</p>
                  <img src={showDetail.fotoSebelum} alt="Sebelum" className="h-32 w-32 rounded-xl object-cover shadow-md" />
                </div>
              )}
              {showDetail?.fotoSesudah && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Foto Sesudah</p>
                  <img src={showDetail.fotoSesudah} alt="Sesudah" className="h-32 w-32 rounded-xl object-cover shadow-md" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Petugas</label>
              <input
                type="text"
                value={detailPetugas}
                onChange={e => setDetailPetugas(e.target.value)}
                className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
                placeholder="Nama petugas penanggung jawab"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Feedback / Deskripsi Tindak Lanjut</label>
              <textarea
                value={detailBalasan}
                onChange={e => setDetailBalasan(e.target.value)}
                rows={3}
                className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 resize-none"
                placeholder="Jelaskan tindak lanjut yang dilakukan..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Foto Sebelum Perbaikan</label>
              <div className="mt-1.5 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-100">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Pilih Foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files[0]
                      if (file) {
                        setDetailFotoSebelum(file)
                        const reader = new FileReader()
                        reader.onload = ev => setDetailFotoSebelumPreview(ev.target.result)
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </label>
              </div>
              {detailFotoSebelumPreview && (
                <div className="mt-3">
                  <img src={detailFotoSebelumPreview} alt="Preview Sebelum" className="h-24 w-24 rounded-xl object-cover shadow-md" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Foto Sesudah Perbaikan</label>
              <div className="mt-1.5 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-100">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Pilih Foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files[0]
                      if (file) {
                        setDetailFotoSesudah(file)
                        const reader = new FileReader()
                        reader.onload = ev => setDetailFotoSesudahPreview(ev.target.result)
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </label>
              </div>
              {detailFotoSesudahPreview && (
                <div className="mt-3">
                  <img src={detailFotoSesudahPreview} alt="Preview Sesudah" className="h-24 w-24 rounded-xl object-cover shadow-md" />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setShowDetail(null)} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100">
              Tutup
            </button>
            <button onClick={confirmDetail} className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]">
              Simpan
            </button>
          </div>
        </Modal>
      </div>
    )
  }

  if (showAdmin) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="./bg-video/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
          <div className="w-full max-w-sm animate-card-float">
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl animate-border-glow-blue">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="mt-2 text-center">
                <h2 className="text-2xl font-bold text-white">Login Admin</h2>
                <p className="mt-1 text-sm text-white/60">Masukkan username dan password</p>
              </div>
              <form className="mt-8 space-y-5" onSubmit={handleAdminLogin}>
                <div>
                  <label className="block text-sm font-medium text-white/80">Username</label>
                  <input
                    type="text"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 hover:border-white/30"
                    placeholder="Masukkan username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80">Password</label>
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 hover:border-white/30"
                    placeholder="Masukkan password"
                  />
                </div>
                <button type="submit" className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="relative z-10">Masuk</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
                </button>
              </form>
              <button onClick={() => setShowAdmin(false)} className="mt-6 w-full text-center text-sm text-white/50 transition-colors hover:text-white/80">
                Kembali ke halaman utama
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 bg-dot-grid relative overflow-hidden">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-green-400/10 blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
          <div className="absolute left-1/2 top-1/3 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl animate-blob" style={{ animationDelay: '8s' }} />
        </div>

        <Toast toast={toast} />

        <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Dashboard Pengaduan</h1>
                <p className="text-xs text-gray-500">{nama} &middot; {kelas} &middot; NIS: {nis}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-gray-900">{jam}</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <button onClick={() => { setLoggedIn(false); setNis(''); setNama(''); setKelas('') }} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98]">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 animate-page-enter">
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.05s' }}>
              <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-blue-500/5" />
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-xl font-bold text-gray-900">{pengaduanList.filter(p => p.nis === nis).length}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-gray-500/5" />
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gray-500 to-slate-600 shadow-sm">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Menunggu</p>
                  <p className="text-xl font-bold text-gray-700">{pengaduanList.filter(p => p.nis === nis && p.status === 'Menunggu').length}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.15s' }}>
              <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-yellow-500/5" />
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 shadow-sm">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Diproses</p>
                  <p className="text-xl font-bold text-yellow-600">{pengaduanList.filter(p => p.nis === nis && p.status === 'Diproses').length}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-md shadow-gray-200/50 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-green-500/5" />
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Selesai</p>
                  <p className="text-xl font-bold text-green-600">{pengaduanList.filter(p => p.nis === nis && p.status === 'Selesai').length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl shadow-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/70 sm:p-8 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-green-400/10 to-emerald-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Buat Aspirasi</h2>
              </div>
              <form className="mt-6 space-y-5" onSubmit={handleTambahPengaduan}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fasilitas</label>
                  <select
                    value={fasilitas}
                    onChange={(e) => setFasilitas(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 hover:border-gray-300"
                  >
                    <option value="">Pilih fasilitas</option>
                    <option>Kelas</option>
                    <option>Toilet</option>
                    <option>Lab Komputer</option>
                    <option>Lab IPA</option>
                    <option>Perpustakaan</option>
                    <option>Kantin</option>
                    <option>Lapangan</option>
                    <option>Mushola</option>
                    <option>Parkiran</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    rows={4}
                    className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 hover:border-gray-300 resize-none"
                    placeholder="Jelaskan aspirasi kamu..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Foto Bukti</label>
                  <div className="mt-1.5 flex items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-100">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Pilih Foto
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setFoto(file)
                            const reader = new FileReader()
                            reader.onload = ev => setFotoPreview(ev.target.result)
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    </label>
                    {foto && <span className="text-sm text-gray-500">{foto.name}</span>}
                  </div>
                  {fotoPreview && (
                    <div className="mt-3">
                      <img src={fotoPreview} alt="Preview" className="h-32 w-32 rounded-xl object-cover shadow-md" />
                    </div>
                  )}
                </div>
                <button type="submit" className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Kirim Aspirasi
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Riwayat Aspirasi</h2>
                {pengaduanList.filter(p => p.nis === nis).length > 0 && (
                  <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700">
{pengaduanList.filter(p => p.nis === nis).length}
                  </span>
                )}
              </div>
              <div className="relative">
                <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm shadow-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 sm:w-64"
                  placeholder="Cari aspirasi..."
                />
              </div>
            </div>
            {(() => {
              const filtered = pengaduanList.filter(p =>
                p.nis === nis && (
                  p.fasilitas.toLowerCase().includes(search.toLowerCase()) ||
                  p.deskripsi.toLowerCase().includes(search.toLowerCase())
                )
              )
              return filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    {search ? 'Tidak Ditemukan' : 'Belum Ada Aspirasi'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {search ? `Tidak ditemukan aspirasi dengan kata kunci "${search}"` : 'Belum ada aspirasi. Kirim aspirasi kamu sekarang!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((p, i) => (
                    <div
                      key={p.id}
                      onClick={() => setStudentDetail(p)}
                      className="cursor-pointer group relative overflow-hidden rounded-xl bg-white p-5 shadow-md shadow-gray-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/70 hover:-translate-y-0.5 animate-fade-up"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                          <span className="font-medium text-gray-500">{p.nama}</span>
                          <span>&middot;</span>
                          <span>{p.kelas}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{p.fasilitas}</h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{p.deskripsi}</p>
                        {p.foto && (
                          <img src={p.foto} alt="Bukti" className="mt-2 h-24 w-32 rounded-lg object-cover shadow-sm" />
                        )}
                        <p className="mt-2 text-xs text-gray-400 flex items-center gap-1.5">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {p.tanggal}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold shadow-sm ${badgeColor(p.status)}`}>
                          <span className="flex items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${dotColor(p.status)} ${p.status === 'Menunggu' ? '' : p.status === 'Diproses' ? 'animate-pulse' : ''}`} />
                            {p.status}
                          </span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          {p.status !== 'Selesai' ? (
                            <>
                              <button onClick={() => openEdit(p)} className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-400 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button onClick={() => openDelete(p.id)} className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-400 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <span className="flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Terkunci
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );})()}
          </div>
        </main>

        <Modal show={studentDetail} onClose={() => setStudentDetail(null)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Detail Aspirasi</h3>
              <p className="text-sm text-gray-500">Informasi lengkap aspirasi kamu</p>
            </div>
          </div>
          <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
            <div className="rounded-xl bg-gray-50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fasilitas</span>
                <span className="font-semibold text-gray-900">{studentDetail?.fasilitas}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tanggal</span>
                <span className="font-semibold text-gray-900">{studentDetail?.tanggal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${badgeColor(studentDetail?.status)}`}>{studentDetail?.status}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Deskripsi</p>
                <p className="text-sm text-gray-900">{studentDetail?.deskripsi}</p>
              </div>
              {studentDetail?.foto && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Foto Bukti</p>
                  <img src={studentDetail.foto} alt="Bukti" className="h-32 w-32 rounded-xl object-cover shadow-md" />
                </div>
              )}
              {studentDetail?.petugas && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Petugas</p>
                  <p className="text-sm font-medium text-blue-600">{studentDetail.petugas}</p>
                </div>
              )}
              {studentDetail?.balasan && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Feedback</p>
                  <p className="text-sm text-blue-900">{studentDetail.balasan}</p>
                </div>
              )}
              {studentDetail?.fotoSebelum && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Foto Sebelum</p>
                  <img src={studentDetail.fotoSebelum} alt="Sebelum" className="h-32 w-32 rounded-xl object-cover shadow-md" />
                </div>
              )}
              {studentDetail?.fotoSesudah && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Foto Sesudah</p>
                  <img src={studentDetail.fotoSesudah} alt="Sesudah" className="h-32 w-32 rounded-xl object-cover shadow-md" />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5">
            <button onClick={() => setStudentDetail(null)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100">
              Tutup
            </button>
          </div>
        </Modal>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Konfirmasi Aspirasi</h3>
              <p className="text-sm text-gray-500">Yakin ingin mengirim aspirasi ini?</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Fasilitas</span>
              <span className="font-semibold text-gray-900">{fasilitas}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Nama</span>
              <span className="font-semibold text-gray-900">{nama}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Kelas</span>
              <span className="font-semibold text-gray-900">{kelas}</span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Deskripsi</p>
              <p className="text-sm text-gray-900">{deskripsi}</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setShowModal(false)} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100">
              Batal
            </button>
            <button onClick={confirmSubmit} className="flex-1 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]">
              Kirim
            </button>
          </div>
        </Modal>

        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Edit Aspirasi</h3>
              <p className="text-sm text-gray-500">Ubah fasilitas atau deskripsi</p>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fasilitas</label>
              <select
                value={editFasilitas}
                onChange={e => setEditFasilitas(e.target.value)}
                className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              >
                <option>Kelas</option>
                <option>Toilet</option>
                <option>Lab Komputer</option>
                <option>Lab IPA</option>
                <option>Perpustakaan</option>
                <option>Kantin</option>
                <option>Lapangan</option>
                <option>Mushola</option>
                <option>Parkiran</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                value={editDeskripsi}
                onChange={e => setEditDeskripsi(e.target.value)}
                rows={4}
                className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 resize-none"
              />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setShowEditModal(false)} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100">
              Batal
            </button>
            <button onClick={confirmEdit} className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]">
              Simpan
            </button>
          </div>
        </Modal>

        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Hapus Aspirasi</h3>
              <p className="text-sm text-gray-500">Yakin ingin menghapus aspirasi ini?</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setShowDeleteModal(false)} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100">
              Batal
            </button>
            <button onClick={confirmDelete} className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98]">
              Hapus
            </button>
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="./bg-video/video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute right-6 top-6 z-20">
        <button
          onClick={() => setShowAdmin(true)}
          className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Login Admin
          </span>
        </button>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-2xl shadow-purple-500/30">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            {"Dashboard Pengaduan".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block animate-split"
                style={{
                  animationDelay: `${i * 0.04}s`,
                  transform: char === " " ? "none" : undefined,
                  width: char === " " ? "0.4em" : undefined,
                  display: char === " " ? "inline-block" : "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p className="mt-3 text-lg text-white/60">{appSettings.namaSekolah}</p>
        </div>

          <div className="w-full max-w-md animate-card-float">
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl animate-border-glow">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="mt-2 text-center">
              <h2 className="text-2xl font-bold text-white">Login Siswa</h2>
              <p className="mt-1 text-sm text-white/60">Kirim dan pantau pengaduan kamu</p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-white/80">NIS</label>
                <input
                  type="text"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30 hover:border-white/30"
                  placeholder="Masukkan NIS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Nama</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30 hover:border-white/30"
                  placeholder="Masukkan nama"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Kelas</label>
                <input
                  type="text"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30 hover:border-white/30"
                  placeholder="Masukkan kelas"
                />
              </div>
              <button type="submit" className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Masuk
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
