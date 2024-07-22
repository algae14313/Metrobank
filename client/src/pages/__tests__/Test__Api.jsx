import Header from '@/components/__tests__/Header'
import LayerBG from '../../assets/BlurLayer.png'
import { Button } from '@/components/ui/button'

export default function Test__Api() {
    return (
        <>
            <div className="dark:bg-[#18191a] w-full flex flex-col justify-start items-center relative overflow-x-hidden pt-[8rem]">
                <Header />
                <img src={LayerBG} alt="Blur" className='absolute top-[-2rem] left-[30rem] sm:left-[25rem] md:left-[20rem] lg:-left-[15rem] w-[20rem] h-[10rem] scale-[5]' />
                <img src={LayerBG} alt="Blur" className='absolute top-[10rem] right-[-30rem] sm:right-[-25rem] md:right-[-20rem] lg:right-[-15rem] w-[20rem] h-[10rem] scale-[5]' />
                <div className="z-[1] w-full h-screen max-w-[80rem] flex flex-col gap-[2rem] px-[10rem]">
                    <div>
                        <div className="w-full flex justify-between items-center px-4 sm:px-0">
                            <div className="flex flex-col">
                                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">API Information</h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-[#8f8f96]">Your personal API keys.</p>
                            </div>
                            <Button variant='secondary'>
                                Create token
                            </Button>
                        </div>

                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Token</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">Margot Foster</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
