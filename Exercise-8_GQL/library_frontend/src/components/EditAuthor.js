import { useMutation } from '@apollo/client'
import { useState } from 'react';
import Select from 'react-select'

import { EDIT_AUTHOR } from '../queries';

const EditAuthor = ({authors}) => {

  const [name, setName] = useState('');
  var [bornDate, setBornDate] = useState('');

  const [ changeBornDate ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()

    bornDate = parseInt(bornDate)
    changeBornDate({ variables: { name, bornDate } })

    setName('')
    setBornDate('')
  }
  const options = authors.map(a => {
    return {
      value: a.name,
      label: a.name
    }
  })

  return (
    <div>
      <h2>Set BirthYear</h2>
      <form onSubmit={submit}>
        <Select 
          options={options}
          defaultValue={name}
          onChange={(target) => setName(target.value)}
        />
        <div>
          born
          <input
            value={bornDate}
            type='number'
            onChange={({ target }) => setBornDate(target.value)}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </div>  
  )
}

export default EditAuthor
