'use client'
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react';

const Navbar = () => {

    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setUpProvider();
    }, [])


    return (
        <nav className='flex justify-between w-full mb-16 pt-4'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src="./assets/images/logo.svg"
                    width={170}
                    height={40}
                    alt="logo"
                />
                
            </Link>
            {/* desktop view */}
            <div className='sm:flex hidden'>
                {
                    session?.user ? <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt"
                            className='black_btn'>
                            Create Post
                        </Link>
                        <button type="button" className='outline_btn' onClick={signOut}>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image src={session?.user.image} width={47} height={47} alt="profile" className='rounded-full' />
                        </Link>
                    </div> :
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                        Sign In
                                    </button>
                                ))
                            }


                        </>
                }
            </div>
            {/* mobile view  */}
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? <div className='flex'>
                        <Image src={session?.user.image} width={47} height={47} alt="profile" className='rounded-full'
                            onClick={() => { setToggleDropdown((prev) => !prev) }} />
                        {
                            toggleDropdown && (
                                <div className='dropdown'>
                                    <Link href='/profile' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                        My Profile
                                    </Link>
                                    <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                        Create Prompt
                                    </Link>
                                    <button onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                        className=' mt-5 w-full black_btn'>
                                        Sign Out
                                    </button>
                                </div>
                            )
                        }
                    </div>
                        : <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                }

            </div>

        </nav>
    )
}

export default Navbar
