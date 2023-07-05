'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(()=>{
        const setProviders = async()=>{
            const response = await getProviders();
            setProviders(response)
        }
        setProviders();
    }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href='/' className="flex gap-2 flex-center">
            <Image 
                src="/assets/images/logo.svg"
                alt="Promptopia Logo"
                width={30}
                height={30}
                className='object-contain'
            ></Image>
            <p className="logo_text">Promptopia</p>
        </Link>

        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Create Post
                    </Link>
                    <button className="outline_btn" type="button" onClick={signOut}>Sign Out</button>
                    <Link href="/profile">
                        <Image 
                            className="rounded-full"
                            src="/assets/images/logo.svg"
                            width={30} 
                            height={30} 
                            alt="profile">
                        </Image>
                    </Link>

                </div>
            ):(
                <>
                    {providers && Object.values(providers).map((provider)=>(
                        <button 
                            type='button' 
                            key={providers.name} 
                            onClick={()=>signIn(provider.id)} 
                            className='black_btn'>
                                Sign In
                        </button>
                    ))}
                </>
            )}
        </div>

        {/* mobile development */}
        <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
                <div className="flex">
                    <Image 
                        className="rounded-full"
                        src="/assets/images/logo.svg"
                        width={37} 
                        height={37} 
                        alt="profile"
                        onClick={()=>{setToggleDropdown((prev)=>!prev)}}
                        >
                    </Image>

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link 
                                className="dropdown_link"
                                href="/profile"
                                onClick={()=>setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link 
                                className="dropdown_link"
                                href="/create-prompt"
                                onClick={()=>setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button className="mt-5 w-full black_btn"
                                type="button"
                                onClick={()=>{
                                    setToggleDropdown(false);
                                    signOut();
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    )}

                </div>
            ):(
                <>
                {providers && Object.values(providers).map((provider)=>(
                    <button 
                        type='button' 
                        key={providers.name} 
                        onClick={()=>signIn(provider.id)} 
                        className='black_btn'>
                            Sign In
                    </button>
                ))}
            </>  
            )}
        </div>

    </nav>
  )
}

export default Nav