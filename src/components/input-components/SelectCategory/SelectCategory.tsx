import React from 'react'
import { IReadCategory } from '../../../interfaces/interfaces'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import './SelectCategory.scss'

interface IProps {
    selectCategory: IReadCategory | null,
    categories: IReadCategory[],
    onChangeCategory: (selectCategory: IReadCategory) => void
}

class SelectCategory extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { value } = event.target;
        const { categories } = this.props;
        categories.forEach(category => {
             if (category.uid === value) {
                this.props.onChangeCategory(category);
             }
         })
    }


    render() {
        const { selectCategory, categories } = this.props;
        return (
            <div className="select">
                <div className="details-category">
                    <TextField
                        margin="normal"
                        type="text"
                        className="input-field-name"
                        value={selectCategory && selectCategory.categoryName}
                    />
                    <br />
                    <TextField
                        multiline
                        rows="2"
                        value={selectCategory && selectCategory.description}
                        margin="normal"
                        className="input-field"
                    />
                </div>
                <div className="choose-category">
                    <FormControl className="select-category">
                        <InputLabel htmlFor="age-helper">Category</InputLabel>
                        <Select
                            value={selectCategory && selectCategory.uid}
                            onChange={this.handleChange}
                        >
                            {
                                categories.map((category) => (
                                    <MenuItem value={category.uid}>{category.categoryName}</MenuItem>
                                ))
                            }
                            {/* <MenuItem value={category.uid}>Unknown</MenuItem> */}
                        </Select>
                    </FormControl>
                </div>
            </div>
        )
    }
}

export default SelectCategory