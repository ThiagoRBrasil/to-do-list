import { useEffect, useState } from "react";
import { ArrowDownUpIcon, FilterIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Separator } from "@/components/ui/separator";
import FormTask from "@/components/FormTask";
import Header from "@/components/Header";
import Task from "@/components/Task";

import {
  addTask,
  deleteTask,
  getTasks,
  updateStatusTask,
  updateTask,
} from "./services/Tasks";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

import { ITask } from "./util/interfaces/Task.interface";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksFiltered, setTasksFiltered] = useState<ITask[]>([]);

  const [orderOrdination, setOrderOrdination] = useState<"asc" | "desc">(
    "desc"
  );

  const handleFetchTasks = async () => {
    const tasks = await getTasks();

    setTasks(tasks);
    setTasksFiltered(tasks);
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  async function handleToCompleteTask(taskId: string) {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          task.isCompleted = !task.isCompleted;
        }

        return task;
      });

      const res = await updateStatusTask(taskId);

      if (res.status === 202) {
        setTasks(updatedTasks);

        toast.success("Você alterou o status da atividade");
      } else {
        throw Error();
      }
    } catch {
      toast.warning(
        "Houve um problema para atualizar sua atividade.\nPor favor tente novamente mais tarde!"
      );
    }
  }

  async function handleToDeleteTask(taskId: string) {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);

      if (updatedTasks) {
        const res = await deleteTask(taskId);

        if (res.status === 200) {
          setTasks(updatedTasks);
          setTasksFiltered(updatedTasks);
          toast.success("Atividade excluída com sucesso!");
        } else {
          throw Error();
        }
      }
    } catch {
      toast.warning(
        "Houve um problema para excluir sua atividade.\nPor favor tente novamente mais tarde!"
      );
    }
  }

  async function handleToUpdateTask(taskId: string, nameUpdated: string) {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          task.name = nameUpdated;
        }
        return task;
      });

      const updatedTask = updatedTasks.find((task) => task.id === taskId);
      if (updatedTask) {
        const res = await updateTask(updatedTask);

        if (res.status === 202) {
          setTasks(updatedTasks);
          setTasksFiltered(updatedTasks);
          toast.success("Atividade atualizada com sucesso!");
        } else {
          throw Error();
        }
      } else {
        toast.warning("Atividade não encontrada");
      }
    } catch {
      toast.warning(
        "Houve um problema para atualizar sua atividade.\nPor favor tente novamente mais tarde!"
      );
    }
  }

  async function handleNewTask(name: string) {
    try {
      const newTask = { id: uuidv4(), name, isCompleted: false };

      const res = await addTask(newTask);

      if (res.status === 201) {
        setTasks([...tasks, newTask]);
        setTasksFiltered([...tasks, newTask]);
      } else {
        throw Error();
      }
    } catch {
      toast.warning(
        "Houve um problema para atualizar sua atividade.\nPor favor tente novamente mais tarde!"
      );
    }
  }

  function orderTasks() {
    setOrderOrdination((prev) => (prev == "desc" ? "asc" : "desc"));

    const tasksOrdened = tasksFiltered.sort((a, b) => {
      if (orderOrdination === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setTasksFiltered(tasksOrdened);
  }

  function filterTasks(isCompleted: boolean | null) {
    setOrderOrdination((prev) => (prev == "desc" ? "asc" : "desc"));

    if (isCompleted == null) {
      console.log(tasks);
      setTasksFiltered(tasks);
      return;
    }

    const tasksOrdened = tasks.filter(
      (task) => task.isCompleted == isCompleted
    );

    setTasksFiltered(tasksOrdened);
  }

  return (
    <div className="p-2 tablet:max-w-full laptop:max-w-5xl desktop:max-w-4xl mx-auto">
      <Header />
      <h1 className="p-6">Lista de Tarefas</h1>

      <FormTask onSubmit={handleNewTask} />

      <div className="mx-6 my-6">
        <Separator />
      </div>

      {tasksFiltered.length > 0 && (
        <div className="flex gap-2 items-end justify-end p-6 flex-col laptop:flex-row desktop:flex-row">
          <div className="flex">
            <Button variant={"outline"} onClick={orderTasks}>
              <ArrowDownUpIcon className="mr-2 h-4 w-4" /> Ordenar
            </Button>
          </div>
          <div className="flex flex-col laptop:flex-row desktop:flex-row gap-2">
            <Button variant={"outline"} onClick={() => filterTasks(null)}>
              <FilterIcon className="mr-2 h-4 w-4" /> Sem filtro
            </Button>

            <Button variant={"outline"} onClick={() => filterTasks(true)}>
              <FilterIcon className="mr-2 h-4 w-4" /> Concluídas
            </Button>

            <Button variant={"outline"} onClick={() => filterTasks(false)}>
              <FilterIcon className="mr-2 h-4 w-4" /> Não concluídas
            </Button>
          </div>
        </div>
      )}

      <section className="flex flex-col gap-2 mx-6">
        {tasksFiltered.map((task) => (
          <Task
            key={task.id}
            name={task.name}
            isCompleted={task.isCompleted}
            onChangeToCompleteTask={() => handleToCompleteTask(task.id)}
            onDelete={() => handleToDeleteTask(task.id)}
            onUpdate={(nameUpdated) => handleToUpdateTask(task.id, nameUpdated)}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
