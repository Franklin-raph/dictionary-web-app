import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Body = ({ dictionaryData, audioFile }) => {

    const meanings = dictionaryData.meanings

    let audioPlayer = new Audio(audioFile)
    const startAudio = () => {
        return audioPlayer.play()
    }

    return (
        <div>
            <div className="textandAudio">
                <>
                    <div className="flex justify-between items-center mb-7">
                        <div>
                            <h3 className="text-5xl font-bold text-gray-700">{dictionaryData && dictionaryData.word}</h3>
                            <p className="text-purple-400 text-xl pt-2 font-[sans-serif]">{dictionaryData && dictionaryData.phonetic}</p>
                        </div>
                        {audioFile ?
                            <div>
                                <i className="ri-volume-up-line text-purple-900 rounded-full p-4 bg-purple-200 text-xl cursor-pointer hover:bg-purple-300 transition-all" onClick={startAudio}></i>
                            </div>
                            :
                            null
                        }
                    </div>
                    {meanings && meanings.map(meaning => (
                        <div>
                            <div className="flex items-center justify-center gap-5">
                                <p className="font-bold my-6 text-2xl italic">
                                    {meaning.partOfSpeech}
                                </p>
                                <div className="h-0.5 bg-slate-200 w-full"></div>
                            </div>
                            <h5 className="text-gray-500 text-lg">Meaning</h5>
                            <ul className="ml-9 mt-3">
                                {meaning.definitions.map(definition => (
                                    <li className="list-disc text-purple-500">
                                        <div className="text-black">
                                            <p>{definition.definition}</p>
                                            {definition.example && <p className="my-3 text-slate-600"> <span className='text-gray-500'>example:</span> "{definition.example}"</p>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {meaning.synonyms.length > 0 &&
                                <div className="flex align-center gap-5 mt-7">
                                    <h3 className="text-gray-500 text-lg">Synonyms</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {meaning.synonyms.map(synonym => (
                                            <p className="font-bold text-purple-600 text-lg" key={synonym[synonym]}>{synonym}</p>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                    {dictionaryData.sourceUrls &&
                        <div className="text-gray-500 flex flex-col md:flex-row items-left mt-12 gap-0 md:gap-4">
                            <p>Source</p>
                            <p className="hover:text-purple-600 flex items-center transition-all">
                                <Link to={dictionaryData.sourceUrls[0]} target="_blank" className="underline pr-2">{dictionaryData.sourceUrls[0]}</Link>
                                <i className="ri-external-link-fill"></i>
                            </p>
                        </div>
                    }
                </>
            </div>
        </div>
    )
}

export default Body