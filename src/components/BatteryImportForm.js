import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const BatteryImportForm = ({ open, onClose }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Importar baterías</DialogTitle>
      <DialogContent>
        <form>
          
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BatteryImportForm