import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import NotificationsIcon from '@mui/icons-material/Notifications'

export function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <NotificationsIcon className="text-[#18191a] cursor-pointer dark:text-white" style={{ fontSize: '1.7rem' }} />
            </PopoverTrigger>
            <PopoverContent className="w-[25rem]">
                <div className="w-full pb-[1rem]">
                    <h1 className="text-[1.2rem] font-[500]">Notifications</h1>
                </div>
                {/* <div className="w-full h-[5rem] p-[.5rem] rounded-sm flex flex-col justify-evenly items-center cursor-default">
                    <h1 className="text-[.85rem]">Nothing around here...</h1>
                </div> */}
                <div className="dark:bg-[#242526] w-full h-[5rem] bg-[#e0dede] p-[.5rem] rounded-sm flex flex-col justify-evenly items-center cursor-default">
                     <div className="w-full flex justify-between items-center">
                        <h1 className="text-[.85rem]">🎉 Payment Successful!</h1>
                        <h1 className="text-[.7rem]">  4 minutes ago.</h1>
                    </div>
                    <div className="w-full px-[1.5rem]">
                        <h1 className="text-[.7rem] text-justify">Your have made a purchase. Transaction reference is 669240fc5024994e6f1ffd56.</h1>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
