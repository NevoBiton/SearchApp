

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
            <div className="w-full max-w-2xl bg-card shadow-lg rounded-lg p-6 text-center border border-gray-200 dark:border-gray-400">
                <h1 className="text-primary font-bold text-3xl mb-4">Welcome to the Search App</h1>
                <p className="text-muted-foreground">
                    Use the search page to find results and see your recent searches.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
