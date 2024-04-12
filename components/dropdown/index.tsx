import { View } from 'react-native';
import { DropdownItemType, DropdownListItem } from './dropdown-list-item';
import { useSharedValue } from 'react-native-reanimated';


type DropdownHeaderType = {
    SemesterName: string,
    SemesterNumber: number,
}

type DropdownProps = {
    header: DropdownHeaderType,
    options: Array<DropdownItemType>,
}

const Dropdown: React.FC<DropdownProps> = ({ header, options }) => {
    const dropdownItems = [header, ...options];
    const isExpanded = useSharedValue(false);
    return (
        <>
            {dropdownItems.map((item, index) => {
                return <DropdownListItem
                        key={index}
                        index={index}
                        {...item}
                        isExpanded={isExpanded}
                        dropdownItemsCount={dropdownItems.length} 
                        />;
            })}
        </>
    )
}

export { Dropdown };