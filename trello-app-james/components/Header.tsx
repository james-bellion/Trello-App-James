"use client" // for things that cant be done on the server but has to be done on the browser

import React from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";

function Header() {

// const googleUserProfile = getGoogleUserProfile(); // Function to get the user profile data
// const profilePictureUrl = googleUserProfile.profileObj.imageUrl;

// const profilePictureUrl = 'https://lh3.googleusercontent.com/a/AAcHTtd2cAWpikS4MhGf5BpvHCxWg5Yj0QcS43wOkdBirfQ9hi4=s288-c-no'
   return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gret-500/10 rounded-b-2xl">
        
        <div
         className="
         absolute
         top-0
         left-0
         w-full
         h-96
         bg-gradient-to-br
         from-pink-400
         to-[#0055D1]
         rounded-md
         filter
         blur-3xl
         opacity-50
         -z-50
         "
        />

        

        <Image
          src="/logo-no-background.png"
          alt="james trello logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className=" flex items-center space-x-5 flex-1 justify-end w-full">
          {/* search box */}
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-grey-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden></button>
          </form>
         
          <Avatar name="james Bellion" round color="#0055D1" size="50" />
        </div>
      </div>

      <div className="flex py-2 items-center justify-center px-5  md:py-5">
        <p className="flex p-5 items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1] ">
         <UserCircleIcon className="inline-block h-10 w-10 text-[#0055D1] mr-1  " />
            GPT is summerising your day
        
        </p>
      </div>
    </header>
  );
}

export default Header;
