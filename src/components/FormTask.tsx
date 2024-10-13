import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export interface IFormTask {
  onSubmit: (name: string) => void;
}

export default function FormTask({ onSubmit }: IFormTask) {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) return;

    onSubmit(name);

    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="m-6 flex flex-row items-end gap-2">
      <div>
        <Label htmlFor="name">Nova tarefa</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <Button className="bg-green-600">
        <PlusIcon className="mr-2 h-4 w-4" /> Add
      </Button>
    </form>
  );
}
