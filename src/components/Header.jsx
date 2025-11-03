import sweetsLogo from '../assets/sweets-logo.png'

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img 
        src={sweetsLogo} 
        alt="sweets shop logo" 
        className="w-32 h-32 mb-4" 
      />
      <h1 className="text-stone-100 text-5xl">Sweet Tooth Shop</h1>
      <p className="text-stone-400 py-4">Create your personal collection of sweets you would like to try!</p>
    </div>
  )
}