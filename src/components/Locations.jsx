import React, { useState } from "react";
import { generateLocationDocument } from "../firebase";

const Locations = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [loc, setLocation] = useState('');
    const [images, setImages] = useState('');
    const [error, setError] = useState(null);

    const createLocationHandler = async (event, title, subtitle, description, loc) => {
        event.preventDefault();
        try{
            var location = {
                title: title,
                subtitle: subtitle,
                description: description,
                location: loc
            }

            await generateLocationDocument(location);
        }
        catch(error){
            setError('Error Signing up with email and password');
        }

        setTitle("");
        setSubtitle("");
        setDescription("");
        setLocation("");
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if (name === 'title') {
            setTitle(value);
        } else if (name === 'subtitle') {
            setSubtitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'loc') {
            setLocation(value);
        } else if (name === 'images') {
            setImages(value);
        }
    };

    return(
        <div className="mt-8">
            <h1 className="text-3xl mb-2 text-center font-bold">Add location</h1>
            <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                <form className="">
                    <label htmlFor="title" className="block">
                        Title:
                    </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full"
                        name="title"
                        value = {title}
                        placeholder="Title"
                        id="title"
                        onChange = {(event) => onChangeHandler(event)}
                    />
                    <label htmlFor="subtitle" className="block">
                        Subtitle:
                    </label>
                    <input
                        type="text"
                        className="mt-1 mb-3 p-1 w-full"
                        name="subtitle"
                        value = {subtitle}
                        placeholder="Subtitle"
                        id="subtitle"
                        onChange = {(event) => onChangeHandler(event)}
                    />
                    <label htmlFor="description" className="block">
                        Description:
                    </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full"
                        name="description"
                        value = {description}
                        placeholder="Description"
                        id="description"
                        onChange = {(event) => onChangeHandler(event)}
                    />
                    <label htmlFor="loc" className="block">
                        Location:
                    </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full"
                        name="loc"
                        value = {loc}
                        placeholder="Location"
                        id="loc"
                        onChange = {(event) => onChangeHandler(event)}
                    />
                    {/*<label htmlFor="title" className="block">*/}
                    {/*    Title:*/}
                    {/*</label>*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    className="my-1 p-1 w-full"*/}
                    {/*    name="title"*/}
                    {/*    value = {title}*/}
                    {/*    placeholder="Title"*/}
                    {/*    id="title"*/}
                    {/*    onChange = {(event) => onChangeHandler(event)}*/}
                    {/*/>*/}
                    <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) => {createLocationHandler(event, title, subtitle, description, loc)}}>
                        Add location
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Locations;