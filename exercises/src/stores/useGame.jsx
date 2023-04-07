import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
    return {
        /**
         * Phases
         */
        phase: 'ready',

        start: () => 
        {
            set((state) => {
                if(state.phase === 'ready')
                {
                    var startMenu = document.getElementById('startScreen');

                    startMenu.remove();
                    // startMenu.style.display = 'none';
                    // startMenu.style.hidden = 'hidden';
                    return { phase: 'playing' }
                }

                    
                

                return {}
            })
        },

        restart: () => 
        {
            set((state) => {
                if(state.phase === 'playing' || state.phase === 'ended')
                    return { phase: 'ready' }

                return {}
            })
        },

        end: () => 
        {
            set((state) => {
                if(state.phase === 'playing')
                    return { phase: 'ended' }
                
                return {}
            })
        }
    }
}))