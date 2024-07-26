function Account() {
  return (
    <>
      <div className="text-l pb-5 font-semibold leading-5">Update Account</div>
      <div>
        <p className="text-sm">Update user data</p>
        <form className="my-3 overflow-hidden rounded-md border-gray-100 bg-gray-50 px-4 pt-3 text-xs">
          <div className="flex items-center gap-8 border-b-2 border-gray-100 pb-3">
            <label className="w-28">Email Address</label>
            <input
              value="demo@example.com"
              disabled
              className="rounded-md border border-gray-300 bg-gray-200 px-2 py-1.5"
            />
          </div>

          <div className="flex items-center gap-8 border-b-2 border-gray-100 py-3">
            <label className="w-28">Full name</label>
            <input
              value="User Name"
              className="rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5"
            />
          </div>

          <div className="flex items-center gap-8 border-b-2 border-gray-100 py-3">
            <label className="w-28">Avatar image</label>
            <input
              value="image"
              className="rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pb-3 pt-2">
            <button className="rounded-md border border-gray-300 px-1.5 py-1 font-[500] text-gray-700 shadow-sm transition hover:bg-gray-200">
              Cancel
            </button>
            <button className="rounded-md border border-gray-300 bg-indigo-600 px-1.5 py-1 font-[500] text-stone-50 shadow-sm transition hover:bg-indigo-800">
              Update account
            </button>
          </div>
        </form>

        <div className="pt-1 text-sm">Update password</div>

        <form className="my-3 overflow-hidden rounded-md border-gray-100 bg-gray-50 px-4 pt-3 text-xs">
          <div className="flex items-center gap-8 border-b-2 border-gray-100 pb-3">
            <label className="w-28">New password</label>
            <input
              value=""
              className="rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5"
            />
          </div>

          <div className="flex items-center gap-8 border-b-2 border-gray-100 py-3">
            <label className="w-28">Confirm password</label>
            <input
              value=""
              className="rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pb-3 pt-2">
            <button className="rounded-md border border-gray-300 px-1.5 py-1 font-[500] text-gray-700 shadow-sm transition hover:bg-gray-200">
              Cancel
            </button>
            <button className="rounded-md border border-gray-300 bg-indigo-600 px-1.5 py-1 font-[500] text-stone-50 shadow-sm transition hover:bg-indigo-800">
              Update password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Account;
