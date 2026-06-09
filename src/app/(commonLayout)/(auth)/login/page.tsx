import LoginForm from '@/components/modules/auth/LoginForm'
import Link from 'next/link'

const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                <div className='space-y-2 text-center'>
                    <h1 className='text-3xl font-bold'>Welcome Back</h1>
                    <p className='text-gray-500'>
                        Enter your credentials to access your account
                    </p>
                </div>
                <LoginForm />
                <div>
                    <Link href="/register" className="text-sm flex items-center justify-center text-center">
                        Don't have an account? <span className="font-medium text-primary">Sign up</span>
                    </Link>
                    <Link
                        href="/forget-password"
                        className="text-blue-600 hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage