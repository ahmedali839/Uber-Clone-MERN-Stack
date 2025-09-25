import React from "react";
import { motion } from "framer-motion";

const AnimationText = ({ text }) => {
    return (
        <div className="textd-start">

            {/* Animated text */}
            <motion.div
                className="text-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className="text-2xl font-bold text-gray-800 mb-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {text}
                </motion.h2>
            </motion.div>
        </div>
    );
};

export default AnimationText;






















// import { motion } from "framer-motion";

// const AnimationEffect = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[200px]">
//       {/* Animated Image */}
//       <motion.img
//         src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" // <-- replace with your image path
//         alt="Working on it..."
//         className="w-24 h-24"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [1, 0.6, 1],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Text effect */}
//       <motion.p
//         className="mt-4 text-lg font-semibold text-gray-700"
//         animate={{ opacity: [0.3, 1, 0.3] }}
//         transition={{ duration: 1.5, repeat: Infinity }}
//       >
//         We’re working on this for you...
//       </motion.p>
//     </div>
//   );
// };

// export default AnimationEffect;






