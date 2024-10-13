import { useState } from "react";

import { CheckIcon, PencilIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

interface ITask {
  name: string;
  isCompleted: boolean;
  onChangeToCompleteTask: () => void;
  onDelete: () => void;
  onUpdate: (nameUpdated: string) => void;
}

export default function Task({
  name,
  isCompleted,
  onChangeToCompleteTask,
  onDelete,
  onUpdate,
}: ITask) {
  const [isToEdit, setIsToEdit] = useState(false);
  const [nameEdited, setNameEdited] = useState(name);

  const bgWhenIsComleted = isCompleted ? "bg-card-disabled" : "";
  const textWhenIsComleted = isCompleted ? "line-through" : "";

  function completeTask() {
    onChangeToCompleteTask();
  }

  function editTask() {
    setIsToEdit(true);
  }

  function saveTask() {
    onUpdate(nameEdited);
    setIsToEdit(false);
  }

  return (
    <Card className={`${bgWhenIsComleted}`}>
      <CardContent className="flex flex-row justify-between items-center p-4">
        <div className="flex gap-2 items-center flex-1">
          {isToEdit ? (
            <div className="flex gap-2 flex-1 me-2">
              <Input
                id="name"
                name="name"
                value={nameEdited}
                onChange={(e) => setNameEdited(e.target.value)}
              />
              <Button onClick={saveTask} className="bg-green-600">
                <CheckIcon />
              </Button>
            </div>
          ) : (
            <>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={completeTask}
                className="h-5 w-5 self-center"
              />
              <p className={textWhenIsComleted}>{name}</p>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {!isCompleted ? (
            <>
              <Button onClick={editTask} className="bg-blue-700">
                <PencilIcon />
              </Button>
              <Button onClick={onDelete} className="bg-red-600">
                <TrashIcon />
              </Button>
            </>
          ) : (
            <CheckIcon color="green" className="me-6" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
