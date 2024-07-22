import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env
=======
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
<<<<<<< HEAD
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";
=======
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

<<<<<<< HEAD
export function InputOTPForm({ isLoad, isVerify }) {
=======
export function InputOTPForm({ isVerify, pin }) {
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });
<<<<<<< HEAD
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (credentials) return navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    async function onSubmit(data) {
        try {
            isLoad(true)
            const res = await axios.post(`${VITE_HOST}/api/verify`, {
                otp: data?.pin
            }, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            if (res?.data?.success) {
                const token = res.data.token
                const userId = res.data.userId
                const role = res.data.role
                sessionStorage.setItem('credentials', JSON.stringify({ token, userId, role }))

                toast({ title: "Yay! Success.", description: 'You have been verified.', });
                navigate('/')
                return
            }
            toast({ title: "Uh, oh! Something went wrong.", description: res?.data?.message, });
        } catch (error) {
            console.error(error)
        } finally {
            fetchCredentials()
            isLoad(false)
        }

=======

    async function onSubmit(data) {
        try {
            pin(data.pin)
        } catch (error) {
            console.error(error)
        }
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    }

    const handleCancel = () => {
        isVerify(false)
    }

    return (
        <Form {...form}>
<<<<<<< HEAD
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
=======
            <form onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)(e);
            }} className="w-2/3 space-y-6">
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>One-Time Password</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-start items-center gap-[1rem]">
<<<<<<< HEAD
                    <button onClick={handleCancel} className='text-white px-[1rem] py-[.6rem] border-[1px] border-white rounded-xl font-[500] text-[.8rem]  hover:bg-[#ffffff] hover:text-black'>
=======
                    <button type="button" onClick={handleCancel} className='text-white px-[1rem] py-[.6rem] border-[1px] border-white rounded-xl font-[500] text-[.8rem]  hover:bg-[#ffffff] hover:text-black'>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className='text-white px-[1rem] py-[.6rem] bg-[#1daeef] rounded-xl font-[600] text-[.8rem] hover:bg-[#58caff]'>
                        Submit
                    </button>
                </div>

            </form>
        </Form>
    );
}
