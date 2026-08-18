const MOCK_USERS = [
  {
    id: 'user_1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    dob: '1990-01-01'
  }
]


export async function loginUser(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = MOCK_USERS.find((u) => u.email === email && u.password === password)
  if (!user) {
    throw new Error('Invalid email or password')
  }
  const { password: _, ...safeUser } = user
  return safeUser
}

export async function registerUser(name, email, password, dob) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  if (MOCK_USERS.some((u) => u.email === email)) {
    throw new Error('Email already registered')
  }
  const user = { id: 'user_' + Date.now(), name, email, dob: dob || '' }
  MOCK_USERS.push({ ...user, password })
  const { password: _, ...safeUser } = user
  return safeUser
}
