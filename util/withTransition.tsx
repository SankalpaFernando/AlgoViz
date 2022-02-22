import React from 'react'
import { motion } from 'framer-motion';

type withTransitionProps = {
  Component:React.FC
}

const withTransition: React.FC<withTransitionProps> = (Component):JSX.Element => {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 100 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  return (
			<>
				<motion.div
					variants={variants}
					initial="hidden"
					animate="enter"
					exit="exit"
					transition={{
						delay: .5,
						x: { type: "spring", stiffness: 50 },
						default: { duration: 1 },
					}}
				>
					<Component/>
				</motion.div>
			</>
		);
};

export default withTransition;