import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-dark grid justify-center">
            <div className="text-white text-center px-4 mt-12">
                <h1 className="font-titulos text-5xl mb-2">MeowMeow</h1>
                <p className="font-texto text-xl">
                    The purrfect place for real-time chat!
                </p>
            </div>

            <div className="text-white text-center px-4 items-center mb-40">
                <p className="font-texto text-lg max-w-lg mb-8">
                    MeowMeow is a delightful real-time chat app where you can connect with your
                    friends instantly. Share your thoughts, send emojis, and experience the
                    joy of meowing together!
                </p>
                <div className="grid">
                <Link
                    to="/signup"
                    className="py-3 px-8 cursor-pointer bg-medium rounded-full text-gray-950 font-bold"
                >
                    Get Started
                </Link> 
                <Link  to="/login" className="text-xs mt-2">
                    or log-in if you already have an account
                </Link>
                </div>
            </div>
        </div>
    )
}
