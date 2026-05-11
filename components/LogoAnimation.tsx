import { motion } from 'framer-motion'

const letters = ['G','Y','A','B','U','S','K','I']

export default function LogoAnimation({ size = 'lg' }: { size?: 'sm'|'lg' }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className={`text-white font-bold ${size === 'lg' ? 'text-5xl' : 'text-xl'}`}
            style={{ fontFamily:'Inter,sans-serif', letterSpacing:'0.15em' }}
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:i*0.08+0.2, duration:0.4, ease:'easeOut' }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.p
        className="text-[#C4B5FD] text-[10px] tracking-[0.4em] uppercase mt-2"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1, duration:0.6 }}
      >
        anonymous emotional archive
      </motion.p>
      <motion.div
        className="h-px bg-[#7C3AED] mt-2"
        initial={{ width:0 }}
        animate={{ width:100 }}
        transition={{ delay:1.2, duration:0.5, ease:'easeOut' }}
      />
    </div>
  )
}