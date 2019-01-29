import deepFreeze from 'deep-freeze';

const config = {
    get from () {
        return new Date( '2018/01/01' );
    },
    get to () {
        return new Date( Date.now() );
    },
    page: 1,
};

deepFreeze( config );

export const from   = config.from;
export const to     = config.to;
export const page   = config.page;

export default config;
