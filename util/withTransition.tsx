import React from 'react'
import { motion } from 'framer-motion';

type withTransitionProps = {
  Component:React.FC
}

const withTransition: React.FC<withTransitionProps> = (Component):JSX.Element => {
  const variants = {
    hidden: { opacity: 0, x: 100, y: 0 },
    enter: { opacity: 1, x: -10, y: 0 },
    exit: { opacity: 0, x: -100, y: 0 },
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
						y: { type: "spring", stiffness: 100 },
						default: { duration: 1 },
					}}
				>
					<Component/>
				</motion.div>
			</>
		);
};

export default withTransition;