import { fetchPhysicalCount, fetchBoughtCount } from "@/app/lib/actions"

export default async function BoughtCount() {
    const totalBought = await fetchBoughtCount();
    const physicalCount = await fetchPhysicalCount();
    const onlineCount = totalBought - physicalCount;
    const totalAmountPhysical = physicalCount * 800;
    const totalAmountOnline = onlineCount * 800;
    const totalAmount = totalAmountPhysical + totalAmountOnline;
    return (
        <div className="w-full flex gap-5 flex-wrap items-center justify-center mt-10">
            <p className="p-5 rounded border-slate-600 border text-zinc-300">Physical - {physicalCount}</p>
            <p className="p-5 rounded border-slate-600 border text-zinc-300">Online - {onlineCount}</p>
            <p className="p-5 rounded border-slate-600 border text-zinc-300">Physical amount(physical) - Rs. {totalAmountPhysical}</p>
            <p className="p-5 rounded border-slate-600 border text-zinc-300">Online amount(online) - Rs. {totalAmountOnline}</p>
            <p className="p-5 rounded border-slate-600 border text-zinc-300">Total amount - {totalAmount}</p>
        </div>
    )
}