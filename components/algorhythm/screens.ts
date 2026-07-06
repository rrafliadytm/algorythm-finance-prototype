export type ScreenId =
  | 'onboarding'
  | 'home'
  | 'quests'
  | 'transaction'
  | 'profile'
  | 'quest-detail'
  | 'reward-claim'
  | 'analytics'
  | 'ewallet'

export const screenList: { id: ScreenId; label: string; group: string }[] = [
  { id: 'onboarding', label: '1. Onboarding', group: 'Utama' },
  { id: 'home', label: '2. Home Dashboard', group: 'Utama' },
  { id: 'quests', label: '3. Quest & Reward', group: 'Utama' },
  { id: 'transaction', label: '4. Catat Transaksi', group: 'Utama' },
  { id: 'profile', label: '5. Profil & Privasi', group: 'Utama' },
  { id: 'quest-detail', label: '6. Detail Misi', group: 'Tambahan' },
  { id: 'reward-claim', label: '7. Klaim Hadiah', group: 'Tambahan' },
  { id: 'analytics', label: '8. Analisis Mendalam', group: 'Tambahan' },
  { id: 'ewallet', label: '9. E-Wallet Hub', group: 'Tambahan' },
]
