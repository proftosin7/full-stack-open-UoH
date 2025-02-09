

const Form = ({handleAddDetails, newName, handleChangeName, newNumber, handleChangeNumber}) => {
  return (
    <div>
        <h2>Add New</h2>
        <form onSubmit={handleAddDetails}>
        <div>
          name: <input placeholder="add name" value={newName} onChange={handleChangeName}/>
        </div>
        <div>number: <input placeholder="add number" value={newNumber} onChange={handleChangeNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

export default Form