'use client';

export default function Error() {

    const reset = ()=> {
        window.location.reload();
    }
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
                <p className="mt-4 text-gray-700 text-lg">
                    Something went wrong. We’re working to fix the problem.
                </p>
                <div className="mt-6">
                    <button
                        onClick={reset}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
