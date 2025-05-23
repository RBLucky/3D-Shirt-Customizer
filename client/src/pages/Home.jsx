import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion'
import { CustomButton } from '../components'

const Home = () => {
  const snap = useSnapshot(state)

  return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section className="home" {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')}>
                    <img
                    src='./cruvio_symbol.png'
                    alt='cruvio logo'
                    className="w-8 h-8 object-contain"
                    />
                </motion.header>

                <motion.div className="home-content" {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className="head-text">
                            MAKE <br className="xl:block hidden" /> IT YOURS.
                        </h1>
                    </motion.div>

                    <motion.div
                        {...headContentAnimation}
                        className="flex flex-col gap-5"
                    >
                        <p className="max-w-md font-normal text-gray-600 text-base">
                            Unleash your imagination with a 3D tool built for <em>creators</em>.
                            <br />
                            <strong>No limits.</strong> Just style—<em>your way</em>.
                        </p>

                        <CustomButton
                            type="filled"
                            title="Design Yours"
                            handleClick={()=> state.intro = false}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home