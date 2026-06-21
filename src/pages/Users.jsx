import { useState, useEffect } from 'react'
import { FiSearch, FiUserPlus, FiEdit2, FiTrash2, FiUsers, FiLock, FiPhone, FiMail, FiShield, FiAlertTriangle, FiCheck } from 'react-icons/fi'
import { userAPI } from '../services/userAPI'
import PageContainer from '../components/PageContainer'
import Button from '../components/Button'
import Modal from '../components/Modal'
import BadgeStatus from '../components/BadgeStatus'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'))

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Form states
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [modalKey, setModalKey] = useState(0)
  const [dataForm, setDataForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'user'
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await userAPI.fetchAllUsers()
      setUsers(data)
    } catch (err) {
      console.error("Gagal memuat user: ", err)
    } finally {
      setLoading(false)
    }
  }

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target
    setDataForm(prev => ({ ...prev, [name]: value }))
  }

  // Reset form
  const resetForm = () => {
    setDataForm({
      username: '',
      email: '',
      phone: '',
      password: '',
      role: 'user'
    })
    setFormError('')
    setFormSuccess('')
  }

  // Open Create Modal
  const handleOpenCreateModal = () => {
    resetForm()
    setModalKey(prev => prev + 1)
    setShowCreateModal(true)
  }

  // Handle Create User
  const handleCreateUser = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError('')

    // Validasi input
    if (!dataForm.username || !dataForm.email || !dataForm.password) {
      setFormError('Username, Email, dan Password wajib diisi!')
      setFormLoading(false)
      return
    }

    try {
      const payload = {
        username: dataForm.username,
        email: dataForm.email,
        password: dataForm.password,
        NoHp: dataForm.phone,
        role: dataForm.role
      }
      await userAPI.registerUser(payload)

      setFormSuccess('User berhasil dibuat!')
      fetchUsers()
      setTimeout(() => {
        setShowCreateModal(false)
        resetForm()
      }, 1000)
    } catch (err) {
      setFormError(err.response?.data?.message || err.message || 'Gagal membuat user!')
    } finally {
      setFormLoading(false)
    }
  }

  // Open Edit Modal
  const handleOpenEditModal = (user) => {
    setSelectedUser(user)
    setDataForm({
      username: user.username || '',
      email: user.email || '',
      phone: user.NoHp || '',
      password: user.password || '',
      role: user.role || 'user'
    })
    setFormError('')
    setFormSuccess('')
    setShowEditModal(true)
  }

  // Handle Edit User
  const handleEditUser = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError('')

    if (!dataForm.username || !dataForm.email) {
      setFormError('Username dan Email wajib diisi!')
      setFormLoading(false)
      return
    }

    try {
      const payload = {
        username: dataForm.username,
        email: dataForm.email,
        password: dataForm.password, // Keep the same password or update
        NoHp: dataForm.phone,
        role: dataForm.role
      }
      await userAPI.updateUser(selectedUser.id, payload)

      // Jika admin mengedit datanya sendiri, update localStorage juga agar konsisten
      if (selectedUser.id === currentUser.id) {
        const updatedCurrentUser = {
          ...currentUser,
          name: dataForm.username,
          firstName: dataForm.username,
          email: dataForm.email,
          phone: dataForm.phone,
          role: dataForm.role
        }
        localStorage.setItem('user', JSON.stringify(updatedCurrentUser))
        setCurrentUser(updatedCurrentUser)
        // Refresh Navbar/Sidebar dengan memicu event storage atau sejenisnya
        window.dispatchEvent(new Event('storage'))
      }

      setFormSuccess('User berhasil diperbarui!')
      fetchUsers()
      setTimeout(() => {
        setShowEditModal(false)
        resetForm()
      }, 1000)
    } catch (err) {
      setFormError(err.response?.data?.message || err.message || 'Gagal memperbarui user!')
    } finally {
      setFormLoading(false)
    }
  }

  // Open Delete Modal
  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  // Handle Delete User
  const handleDeleteUser = async () => {
    setFormLoading(true)
    setFormError('')

    if (selectedUser.id === currentUser.id) {
      setFormError('Anda tidak bisa menghapus akun Anda sendiri!')
      setFormLoading(false)
      return
    }

    try {
      await userAPI.deleteUser(selectedUser.id)
      fetchUsers()
      setShowDeleteModal(false)
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Gagal menghapus user!')
    } finally {
      setFormLoading(false)
    }
  }

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  // Protection Fallback
  if (currentUser.role !== 'admin') {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-red-100 shadow-sm">
          <FiAlertTriangle className="text-rose-500 text-6xl mb-4 animate-bounce" />
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Akses Ditolak!</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-sm">Halaman ini hanya dapat diakses oleh Administrator na_store.id.</p>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* Header Halaman */}
      <div className="bg-white p-6 rounded-3xl border border-[#FDEDED] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">User Profile Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Kelola data login, kontak, dan hak akses (role) pengguna database.</p>
        </div>
        <div>
          <Button variant="primary" icon={<FiUserPlus />} onClick={handleOpenCreateModal}>
            Tambah User
          </Button>
        </div>
      </div>

      {/* Toolbar & Filter */}
      <div className="bg-white p-4 rounded-3xl border border-[#FDEDED] shadow-sm flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari user berdasarkan username atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-11 pr-4 text-xs focus:border-[#F875AA] focus:outline-none focus:bg-white transition-all shadow-3xs"
          />
        </div>

        {/* Filter Role */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role:</span>
          {['all', 'admin', 'user'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all duration-200 uppercase tracking-wider ${filterRole === role
                  ? 'bg-[#F875AA] text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-[#FDEDED]/40 hover:text-[#F875AA]'
                }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Tabel Data User */}
      <div className="bg-white border border-[#FDEDED] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FFF5E4]/60 border-b border-[#FDEDED]">
              <tr className="text-gray-600 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">User Info</th>
                <th className="px-6 py-4">Kontak / NoHp</th>
                <th className="px-6 py-4">Hak Akses (Role)</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FDEDED]/40">
              {loading ? (
                // Loading Skeletons
                [...Array(3)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-8"></div></td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-24"></div>
                          <div className="h-3 bg-gray-100 rounded w-32"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-28"></div></td>
                    <td className="px-6 py-5"><div className="h-6 bg-gray-100 rounded-full w-16"></div></td>
                    <td className="px-6 py-5"><div className="h-8 bg-gray-100 rounded-xl w-24 mx-auto"></div></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-gray-400 bg-gray-50/10">
                    <FiUsers className="mx-auto text-4xl mb-3 text-gray-300 animate-pulse" />
                    <p className="font-bold text-sm">Tidak ada user yang ditemukan</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FDEDED]/10 transition-colors duration-150">
                    <td className="px-6 py-4 text-xs font-mono font-bold text-gray-400">{user.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F875AA] to-[#AEDEFC] flex items-center justify-center font-black text-white text-md shadow-3xs">
                          {(user.username || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                            {user.username}
                            {user.id === currentUser.id && (
                              <span className="text-[10px] font-bold bg-[#AEDEFC]/30 text-blue-600 px-2 py-0.5 rounded-full">Anda</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-600">{user.NoHp || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-xl shadow-3xs ${user.role === 'admin'
                          ? 'bg-purple-50 text-purple-600 border border-purple-200'
                          : 'bg-blue-50 text-blue-600 border border-blue-200'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(user)}
                          className="p-2 text-[#F875AA] hover:bg-[#FDEDED]/40 rounded-xl transition-all"
                          title="Edit User"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(user)}
                          disabled={user.id === currentUser.id}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Hapus User"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL TAMBAH USER ================= */}
      <Modal isOpen={showCreateModal} onClose={() => !formLoading && setShowCreateModal(false)} title="Tambah User Baru">
        <form key={modalKey} onSubmit={handleCreateUser} className="space-y-4">
          {formError && (
            <div className="bg-rose-50 text-rose-600 text-xs p-3 rounded-xl border border-rose-100 flex items-center gap-2">
              <span>⚠️</span> <span>{formError}</span>
            </div>
          )}
          {formSuccess && (
            <div className="bg-emerald-50 text-emerald-600 text-xs p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
              <FiCheck /> <span>{formSuccess}</span>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Username</label>
            <div className="relative">
              <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                value={dataForm.username}
                onChange={handleChange}
                placeholder="Username akun"
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Alamat Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                placeholder="email@domain.com"
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Nomor Ponsel (NoHp)</label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="phone"
                value={dataForm.phone}
                onChange={handleChange}
                placeholder="+62 atau 08xxx"
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={dataForm.password}
                onChange={handleChange}
                placeholder="Buat password"
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Hak Akses (Role)</label>
            <select
              name="role"
              value={dataForm.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-bold text-gray-700"
            >
              <option value="user">User biasa (Member)</option>
              <option value="admin">Admin (Full Access)</option>
            </select>
          </div>

          <div className="pt-2 flex gap-2 justify-end">
            <Button
              type="secondary"
              htmlType="button"
              onClick={() => setShowCreateModal(false)}
              disabled={formLoading}
            >
              Batal
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={formLoading}
            >
              {formLoading ? 'Memproses...' : 'Simpan User'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ================= MODAL EDIT USER ================= */}
      <Modal isOpen={showEditModal} onClose={() => !formLoading && setShowEditModal(false)} title="Perbarui Data User">
        <form onSubmit={handleEditUser} className="space-y-4">
          {formError && (
            <div className="bg-rose-50 text-rose-600 text-xs p-3 rounded-xl border border-rose-100 flex items-center gap-2">
              <span>⚠️</span> <span>{formError}</span>
            </div>
          )}
          {formSuccess && (
            <div className="bg-emerald-50 text-emerald-600 text-xs p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
              <FiCheck /> <span>{formSuccess}</span>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Username</label>
            <div className="relative">
              <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                value={dataForm.username}
                onChange={handleChange}
                placeholder="Username akun"
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Alamat Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                placeholder="email@domain.com"
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Nomor Ponsel (NoHp)</label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="phone"
                value={dataForm.phone}
                onChange={handleChange}
                placeholder="+62 atau 08xxx"
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={dataForm.password}
                onChange={handleChange}
                placeholder="Ganti password (opsional)"
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#F875AA] uppercase tracking-widest mb-1.5 ml-1">Hak Akses (Role)</label>
            <select
              name="role"
              value={dataForm.role}
              onChange={handleChange}
              disabled={selectedUser?.id === currentUser.id}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 bg-gray-50 focus:bg-white text-sm font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="user">User biasa (Staff)</option>
              <option value="admin">Admin (Full Access)</option>
            </select>
            {selectedUser?.id === currentUser.id && (
              <p className="text-[10px] text-gray-400 mt-1 pl-1">Anda tidak dapat menurunkan/mengubah role Anda sendiri.</p>
            )}
          </div>

          <div className="pt-2 flex gap-2 justify-end">
            <Button
              type="secondary"
              htmlType="button"
              onClick={() => setShowEditModal(false)}
              disabled={formLoading}
            >
              Batal
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={formLoading}
            >
              {formLoading ? 'Memproses...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ================= MODAL KONFIRMASI HAPUS ================= */}
      <Modal isOpen={showDeleteModal} onClose={() => !formLoading && setShowDeleteModal(false)} title="Hapus User">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 text-xl border border-rose-100">
            <FiTrash2 />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Apakah Anda yakin?</h3>
            <p className="text-xs text-gray-500 mt-1">Tindakan ini tidak dapat dibatalkan. Pengguna <strong>{selectedUser?.username}</strong> akan dihapus permanen dari database.</p>
          </div>

          <div className="pt-2 flex gap-2 justify-center">
            <Button
              type="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={formLoading}
            >
              Batal
            </Button>
            <Button
              type="danger"
              onClick={handleDeleteUser}
              disabled={formLoading}
            >
              {formLoading ? 'Menghapus...' : 'Hapus Sekarang'}
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}
