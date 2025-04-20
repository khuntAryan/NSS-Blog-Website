
import { Login as LoginComponent } from '../components'

function Login() {
  return (
    <div className='py-16 bg-gray-900 text-black min-h-screen flex items-center justify-center'>
        <div className="container mx-auto px-4 max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Login</h1>
            <LoginComponent />
        </div>
    </div>
  )
}

export default Login
