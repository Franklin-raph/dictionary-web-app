import { useState } from 'react'


const Header = ({ toggleBackground, getMeaning }) => {
    const [fontPallete, setFontPallete] = useState(false)
    const fonts = ['serif', 'sans-serif', 'monospace']
    const [currentFontFamily, setCurrentFontFamily] = useState(fonts[0])
    const [keyword, setKeyword] = useState("")

    function changeFontFamily(e) {
        setCurrentFontFamily(e.target.innerText)
    }

    function toggleFontPallete() {
        setFontPallete(!fontPallete)
    }

    // if (keyword === undefined) {
    //     return
    // } else {
    //     localStorage.setItem('keyword', keyword)
    // }

    return (
        <div style={{ fontFamily: currentFontFamily }}>
            <div className='flex items-center justify-between'>
                <i className="ri-book-2-line text-gray-400 font-thin" style={{ fontSize: '2rem' }}></i>
                <div className='flex items-center justify-center gap-8'>
                    <div className="flex items-center gap-1 relative">
                        <p>{currentFontFamily}</p>
                        <i className="ri-arrow-down-s-line hover:cursor-pointer hover:text-purple-600" onClick={toggleFontPallete}></i>
                        {fontPallete &&
                            <ul className="absolute bg-slate-900 text-gray-200 top-6 z-10 p-3 rounded-md">
                                {fonts.map(font => (
                                    <li className='hover:cursor-pointer' onClick={changeFontFamily} key={font}>{font}</li>
                                ))}
                            </ul>
                        }
                    </div>
                    <span className="text-gray-400 font-thin">|</span>
                    <div className='flex items-center justify-center gap-2'>
                        <label className="toggleDarkBtn">
                            <input type="checkbox" onClick={toggleBackground} />
                            <span className="slideBtnTg round"></span>
                        </label>
                        <i className="ri-moon-line"></i>
                    </div>
                </div>
            </div>
            <form onSubmit={e => getMeaning(e)} className="relative block my-7">
                <input type="text" name='dictionaryKeyword' id='test' className="w-full bg-slate-100 py-2 px-4 rounded-md focus:outline-none font-bold" onChange={(e) => setKeyword(e.target.value)} />
                <span className="absolute top-0 bottom-1 right-3 flex items-center">
                    <i className="ri-search-line h-5 w-5 text-purple-600 hover:cursor-pointer" onClick={getMeaning}></i>
                </span>
            </form>
        </div>
    )
}

export default Header