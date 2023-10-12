import React from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

interface triggerFormProps {
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
  setRecordID: React.Dispatch<React.SetStateAction<number>>
}

const TriggerForm: React.FC<triggerFormProps> = ({ setOpenForm, setRecordID }) => {
  return (
    <Button variant="outline" onClick={() => { setOpenForm(true); setRecordID(1) }}>
      Edit
    </Button>
  )

}

export default function SingleForm() {
  const [openForm, setOpenForm] = React.useState(false)
  const [recordID, setRecordID] = React.useState(0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console log the form data
    console.log(event.currentTarget)
  }

  return (
    <main>
      <Button>A</Button>
      <h1>Single Form</h1>
      <Dialog onOpenChange={setOpenForm} open={openForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form action="" onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  // defaultValue="Pedro Duarte"
                  className="col-span-3"
                  value={recordID}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
          <DialogFooter>
            <Button type="button">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div>
        <ul>
          {[1, 2, 3, 4, 5].map((recordID) => (
            <li key={recordID}>
              <TriggerForm setOpenForm={setOpenForm} setRecordID={setRecordID} />
            </li>
          ))}

        </ul>
      </div>
    </main>
  )

}
