import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { actions } from '../slices';

export const Filter = ({ name, title, values }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const filterKeys = Object.keys(values);
    dispatch(actions.loadFilter({ name, filterKeys }));
  }, []);

  const currentFilterKeys = useSelector((state) => state.filters[name]);

  const isChecked = (filterKey) => currentFilterKeys.includes(filterKey);

  const handleChange = (event) => {
    const filterKey = event.target.name;
    dispatch(actions.changeFilter({ name, filterKey }));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <FormGroup>
        {Object.keys(values).map((value) => (
          <FormControlLabel
            control={<Checkbox checked={isChecked(value)} name={value} />}
            label={values[value]}
            key={value}
            onChange={handleChange}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
