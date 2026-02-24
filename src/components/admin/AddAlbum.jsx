import React, { useState } from "react";
import toast from "react-hot-toast";

import Spinner from "../../helpers/Spinner";
import { doc, setDoc } from "@firebase/firestore";
import { __DB } from "../../backend/FirebaseConfig";

const AddAlbum = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [album, setAlbum] = useState({
    albumTitle: "",
    albumPoster: null,
    albumReleaseDate: "",
    albumLanguages: "",
    albumDescription: "",
  });
  let {
    albumTitle,
    albumPoster,
    albumReleaseDate,
    albumLanguages,
    albumDescription,
  } = album;

  let handleAlbumChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setAlbum({ ...album, [key]: value });
  };
  let handleAlbumPosterChange = (e) => {
    let file = e.target.files[0];
    setAlbum({ ...album, albumPoster: file });
  };
  let initialSongData = {
    songName: "",
    songFile: null,
    songThumbnail: null,
    songSingers: "",
    songMood: "",
    songDirector: "",
  };
  let [songs, setSongs] = useState([initialSongData]);

  let addSongs = () => {
    setSongs([...songs, { ...initialSongData }]);
  };
  let removeSong = (ind) => {
    let newSongs = songs.filter((value, index) => index !== ind);
    setSongs(newSongs);
  };
  let handleSongChange = (e, index) => {
    let value = e.target.value;
    let key = e.target.name;
    let copy = [...songs];
    copy[index][key] = value;
    setSongs(copy);
  };

  let handleSongFileChange = (e, index) => {
    let file = e.target.files[0];
    let key = e.target.name;
    let copy = [...songs];
    copy[index][key] = file;
    setSongs(copy);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let albumPosterData = new FormData();
      albumPosterData.append("file", albumPoster);
      albumPosterData.append("upload_preset", "innovators hub music");
      let posterResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dje6p1gli/image/upload",
        {
          method: "POST",
          body: albumPosterData,
        }
      );
      let posterResult = await posterResponse.json();
      console.log(posterResult);
      let albumId = posterResult.asset_id;
      let albumPosterURL = posterResult.url;
      let albumData = {
        albumId: albumId,
        albumTitle: albumTitle,
        albumPosterURL: albumPosterURL,
        albumReleaseDate: albumReleaseDate,
        albumLanguages: albumLanguages,
        albumDescription: albumDescription,
      };
      console.log(albumData);

      let songData = [];

      await Promise.all(
        songs.map(async (value, index) => {
          console.log(value);

          let songThumbnailData = new FormData();
          songThumbnailData.append("file", value.songThumbnail);
          songThumbnailData.append("upload_preset", "innovators hub music");
          let songThumbnailResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dje6p1gli/image/upload",
            {
              method: "POST",
              body: songThumbnailData,
            }
          );
          let songThumbnailResult = await songThumbnailResponse.json();
          let songThumbnailURL = songThumbnailResult.url;

          let songFileData = new FormData();
          songFileData.append("file", value.songFile);
          songFileData.append("upload_preset", "innovators hub music");

          let songFileResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dje6p1gli//upload",
            {
              method: "POST",
              body: songFileData,
            }
          );
          let songFileResult = await songFileResponse.json();
          let songFileURL = songFileResult.url;
          let songFileFormat = songFileResult.format;
          let songFileBytes = songFileResult.bytes;
          let songFileId = songFileResult.asset_id;
          let songFileDuration = songFileResult.duration;

          let songpPayload = {
            songId: songFileId,
            songName: value.songName,
            songURl: songFileURL,
            songThumbnailURL: songThumbnailURL,
            songFormat: songFileFormat,
            songBytes: songFileBytes,
            songDuration: songFileDuration,
            songSingers: value.songSingers,
            songMood: value.songMood,
            songDirector: value.songDirector,
          };
          songData.push(songpPayload);
        })
      );

      let payload = { ...albumData, songs: songData };
      console.log(payload);

      let album_collection = doc(__DB, "album_collection", albumData.albumId);
      await setDoc(album_collection,payload)
    } catch (error) {
      console.log(error);
      // toast.error(error)
    } finally {
      setIsLoading(false);
    }
    console.log(album);
  };
  return (
    <section className="h-[100%] w-[100%]  flex p-6 justify-center">
      <article className=" min-h-[800px] w-[75%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-center text-2xl">Add Album </h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <h3 className="text-xl">Album Details</h3>
          <article className="mt-3 flex flex-wrap gap-3">
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="albumTitle" className="block text-[18px]">
                Album title
              </label>
              <input
                type="text"
                id="albumTitle"
                placeholder="Enter album title"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={albumTitle}
                name="albumTitle"
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="albumPoster" className="block text-[18px] ">
                Album Poster
              </label>
              <input
                type="file"
                id="albumPoster"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black file:bg-slate-700 file:px-3 file:text-white file:rounded-sm"
                name="albumPoster"
                onChange={handleAlbumPosterChange}
              />
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="releaseDate" className="block text-[18px] ">
                Release Date
              </label>
              <input
                type="date"
                id="releaseDate"
                placeholder="Enter releaseDate"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={albumReleaseDate}
                name="albumReleaseDate"
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="languages" className="block text-[18px] ">
                Languages
              </label>
              <input
                type="text"
                id="languages"
                placeholder="Enter languages"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={albumLanguages}
                name="albumLanguages"
                onChange={handleAlbumChange}
              />
            </div>

            <div className="flex gap-2 flex-col w-[98%]">
              <label htmlFor="albumDescription" className="block text-[18px] ">
                Album Description
              </label>
              <textarea
                id="albumDescription"
                placeholder="Enter album Description"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={albumDescription}
                name="albumDescription"
                onChange={handleAlbumChange}
              />
            </div>
          </article>
          <h3 className="mt-3 text-xl">Song Details</h3>
          <article className="mt-3 flex flex-col gap-4">
            {songs.map((value, index) => {
              return (
                <section className="bg-slate-700 rounded-lg p-4" key={index}>
                  <h4 className="text-center text-lg">Song{index + 1}</h4>

                  <main className="flex flex-wrap gap-2">
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label htmlFor="songname" className="block text-[18px]">
                        Song Name
                      </label>
                      <input
                        type="text"
                        id="songname"
                        placeholder="Enter songname"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                        value={value.songName}
                        name="songName"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label htmlFor="songfile" className="block text-[18px]">
                        Song File
                      </label>
                      <input
                        type="file"
                        id="songfile"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black file:bg-slate-700 file:px-3 file:text-white file:rounded-sm"
                        name="songFile"
                        onChange={(e) => handleSongFileChange(e, index)}
                      />
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label
                        htmlFor="songthumbnail"
                        className="block text-[18px]"
                      >
                        Song Thumbnail
                      </label>
                      <input
                        type="file"
                        id="songthumbnail"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black file:bg-slate-700 file:px-3 file:text-white file:rounded-sm"
                        name="songThumbnail"
                        onChange={(e) => handleSongFileChange(e, index)}
                      />
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label htmlFor="singers" className="block text-[18px]">
                        Singers
                      </label>
                      <input
                        type="text"
                        id="singers"
                        placeholder="Enter singers"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                        value={value.songSingers}
                        name="songSingers"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label htmlFor="mood" className="block text-[18px]">
                        Song Mood
                      </label>
                      <input
                        type="text"
                        id="mood"
                        placeholder="Enter mood"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                        value={value.songMood}
                        name="songMood"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label htmlFor="director" className="block text-[18px]">
                        Director
                      </label>
                      <input
                        type="text"
                        id="director"
                        placeholder="Enter  director"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                        value={value.songDirector}
                        name="songDirector"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>

                    <div className="flex justify-between w-[100%]">
                      <div>
                        {songs.length - 1 == index && (
                          <input
                            type="button"
                            value="Add Song"
                            className="py-2 px-4 bg-green-600 rounded-lg cursor-pointer"
                            onClick={addSongs}
                          />
                        )}
                      </div>
                      <div>
                        {songs.length > 1 && (
                          <input
                            type="button"
                            value="Remove Song"
                            className="py-2 px-4 bg-red-600 rounded-lg cursor-pointer"
                            onClick={() => removeSong(index)}
                          />
                        )}
                      </div>
                    </div>
                  </main>
                </section>
              );
            })}
          </article>
          <button className="w-[98%] py-2 cursor-pointer bg-blue-600 rounded-lg mt-3">
            Upload album
          </button>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};
export default AddAlbum;










