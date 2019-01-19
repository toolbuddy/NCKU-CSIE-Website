import { tagNameToNum, tagNumToName, } from 'settings/components/tags/config.js';
import { defaultValue, } from 'settings/default-value/announcement/config.js';

class tagUtils {
    static tagNumToName ( num, lang ) {
        return tagNumToName[ lang ][ num ];
    }

    static tagNameToNum ( name, lang ) {
        return tagNameToNum[ lang ][ name ];
    }

    static isValidTagNames ( names, lang ) {
        // Return Object.values( tagNumToName[ lang ] ).indexOf( name.toLowerCase() ) > -1;
        return ( names.filter( name => Object.values( tagNumToName[ lang ] ).indexOf( name.toLowerCase() ) > -1 ).length === 0 ) && names.length;
    }

    static isValidTagNums ( nums ) {
        // Return num > 0 && num <= Object.keys( tagNameToNum[ defaultValue.language ] ).length;
        if ( nums.length === 0 )
            return true;
        return ( nums.filter( num => num > 0 && num <= Object.keys( tagNameToNum[ defaultValue.language ] ).length ).length === 0 ) && nums.length;
    }
}

export default tagUtils;
