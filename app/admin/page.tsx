import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
const admin = () => {
  return (
    <div className="px-6 py-10">
        <Textarea placeholder="Enter Json">

        </Textarea>
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Stock Market Status</Label>
    <Field>
      <FieldLabel htmlFor="bet">Bet Description</FieldLabel>
      <Input id="bet" type="password" placeholder="Enter Bet" />
      <FieldDescription>
        Add a bet or something
      </FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="bet-options">Bet Options</FieldLabel>
      <Input id="bet-options" type="password" placeholder="Enter Bet Options" />
      <FieldDescription>
        Add bet options
      </FieldDescription>
    </Field>

    </div>
  )
}

export default admin