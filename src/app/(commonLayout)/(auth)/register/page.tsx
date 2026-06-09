import RegisterForm from "@/components/modules/auth/RegisterForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const RegisterPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center w-full p-6 md:p-10">
            <div className="w-full max-w-xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an Account</CardTitle>
                        <CardDescription>Enter your information below to create an account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                    <Link href="/login" className="text-sm text-center ">
                        Already have an account? <span className="font-medium text-primary">Sign in</span>
                    </Link>
                </Card>
            </div>
        </div>
    )
}

export default RegisterPage