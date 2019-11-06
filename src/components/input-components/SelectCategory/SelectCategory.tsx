import React from 'react'
import { IReadCategory } from '../../../interfaces/interfaces'
import { TextField, FormControl, Select, MenuItem } from '@material-ui/core'
import './SelectCategory.scss'

interface IProps {
    selectCategory: IReadCategory | null,
    categories: IReadCategory[],
    onChangeCategory: (selectCategory: IReadCategory) => void
}

const emptyCategory: IReadCategory = {
    appID: '',
    categoryName: '',
    description: '',
    uid: ''
}

class SelectCategory extends React.Component<IProps> {

    handleChange = (event: React.ChangeEvent<{ value: any }>) => {
        const { value } = event.target;
        const { categories } = this.props;
        categories.forEach(category => {
            if (category.uid === value) {
                this.props.onChangeCategory(category);
            }
        })
    }

    render() {
        const { selectCategory: selCat, categories } = this.props;
        const selectCategory = selCat || {...emptyCategory}
        return (
            <div className="select-category-block">
                <h2 className="select-category-title">Selected Category</h2>
                <div className="my-select-category">
                    <div className="block-category">
                        <TextField
                            margin="normal"
                            type="text"
                            placeholder="Category Name"
                            className="input-field"
                            value={selectCategory && selectCategory.categoryName}
                        />
                        <br />
                        <TextField
                            multiline
                            rows="3"
                            value={selectCategory && selectCategory.description}
                            margin="normal"
                            className="input-field"
                            placeholder="Category Descriprion"
                        />
                    </div>
                    <div className="block-category">
                        <FormControl className="input-field">
                            <Select
                                value={selectCategory && selectCategory.uid}
                                onChange={this.handleChange}
                            >
                                {
                                    categories.map((category) => (
                                        <MenuItem key={category.uid} value={category.uid}>{category.categoryName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectCategory