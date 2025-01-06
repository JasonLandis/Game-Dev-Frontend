export default async function RegisterPage() {
  return (
    <main>
      <div className="w-full max-w-md mx-auto p-8 shadow-xl rounded-lg mt-10 border-2 border-black">
        <div className="mb-8">
          <label className="flex justify-center block font-bold mb-2">Username</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded" />
        </div>
        <div className="mb-8">
          <label className="flex justify-center block font-bold mb-2">Password</label>
          <input type="password" className="w-full border border-gray-300 p-2 rounded" />
        </div>
        <div className="mb-8">
          <label className="flex justify-center block font-bold mb-2">Confirm Password</label>
          <input type="password" className="w-full border border-gray-300 p-2 rounded" />
        </div>
        <div className="mb-2">
          <button className="w-full bg-slate-200 p-2 rounded-lg font-semibold transition-transform hover:bg-slate-300 active:scale-95">
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
