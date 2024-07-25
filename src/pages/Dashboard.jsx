import { HiOutlineBriefcase } from 'react-icons/hi2';

function Dashboard() {
  return (
    <>
      <div className="text-l pb-5 font-semibold leading-5">Dashboard</div>
      <div className="flex flex-col justify-center text-xs">
        <div className="grid grid-cols-4 gap-3">
          <div className="rounded-md border-gray-100 bg-gray-50 p-4">
            <div className="relative grid grid-cols-3 items-center gap-3">
              <div className="ml-[-0.5rem] flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <HiOutlineBriefcase />
              </div>
              <div>
                <h5 className="mb-[-0.4rem] self-end text-[0.5rem] font-semibold uppercase tracking-wide text-gray-500">
                  title
                </h5>
                <p className="text-sm">stat</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border-gray-100 bg-gray-50 p-4">
            <div className="relative grid grid-cols-3 items-center gap-3">
              <div className="ml-[-0.5rem] flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <HiOutlineBriefcase />
              </div>
              <div>
                <h5 className="mb-[-0.4rem] self-end text-[0.5rem] font-semibold uppercase tracking-wide text-gray-500">
                  title
                </h5>
                <p className="text-sm">stat</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border-gray-100 bg-gray-50 p-4">
            <div className="relative grid grid-cols-3 items-center gap-3">
              <div className="ml-[-0.5rem] flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <HiOutlineBriefcase />
              </div>
              <div>
                <h5 className="mb-[-0.4rem] self-end text-[0.5rem] font-semibold uppercase tracking-wide text-gray-500">
                  title
                </h5>
                <p className="text-sm">stat</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border-gray-100 bg-gray-50 p-4">
            <div className="relative grid grid-cols-3 items-center gap-3">
              <div className="ml-[-0.5rem] flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <HiOutlineBriefcase />
              </div>
              <div>
                <h5 className="mb-[-0.4rem] self-end text-[0.5rem] font-semibold uppercase tracking-wide text-gray-500">
                  title
                </h5>
                <p className="text-sm">stat</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 grid grid-cols-2 gap-3">
          <div className="rounded-md border-gray-100 bg-gray-50 py-14">
            row-2-col-1
          </div>
          <div className="rounded-md border-gray-100 bg-gray-50 py-14">
            row-2-col-2
          </div>
        </div>

        <div>
          <div className="rounded-md border-gray-100 bg-gray-50 py-24">
            row-3-col-1
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
