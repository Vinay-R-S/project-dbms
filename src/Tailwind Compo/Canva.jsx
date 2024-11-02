import React from 'react';
import ProjectCard from './ProjectCard.jsx';
import UserCard from './UserCard.jsx';

const Canva = () => {

    const text_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."

    return (
        <div className="flex flex-col md:flex-row w-full mt-20">
            <div className="flex-1 border-4 hover:border-pink-400 bg-pink-100 p-4 rounded-lg mr-4 mb-4 md:mb-0 hover:bg-pink-100 opacity-70 hover:opacity-90 transition duration-200 ease-in-out">
                <h2 className="text-xl font-bold mb-4">Plans to do</h2>

                <ProjectCard title="Project DBMS" date="5th Nov, 2024" author="Ashwini" description={text_content} tags={["Krishna", "Vinay"]} />
                <UserCard title="Project DBMS" date="3rd Nov, 2024" author="Vinay" description={text_content} />

                <ProjectCard title="Project Java" date="6th Nov, 2024" author="Sathya" description={text_content} tags={["Krishna", "Vinay"]} />
                <UserCard title="Project Java" date="4th Nov, 2024" author="Krishna" description={text_content} />
            </div>

            <div className="flex-1 border-4 hover:border-yellow-400 bg-yellow-100 p-4 rounded-lg mr-4 mb-4 md:mb-0 opacity-70 hover:opacity-90 transition duration-300 ease-in-out">
                <h2 className="text-xl font-bold mb-4">Ongoing Work</h2>

                <UserCard title="Project DBMS" date="4th Nov, 2024" author="Vinay" description={text_content} status="working" />
                <UserCard title="Project Java" date="4th Nov, 2024" author="Vinay" description={text_content} status="working" />
            </div>

            <div className="flex-1 border-4 hover:border-green-400 bg-green-100 p-4 rounded-lg mr-4 mb-4 md:mb-0 opacity-70 hover:opacity-90 transition duration-300 ease-in-out">
                <h2 className="text-xl font-bold mb-4">Completed Work</h2>

                <UserCard title="Project DBMS" date="4th Nov, 2024" author="Vinay" description={text_content} />
                <UserCard title="Project DBMS" date="4th Nov, 2024" author="Vinay" description={text_content} />

            </div>
        </div>
    );
};

export default Canva;
