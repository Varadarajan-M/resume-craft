import { Skill, SkillCategory } from "@/shared/types/resume";
import { useReducer } from "react";

export type SkillsState = {
  categories: SkillCategory[];
};

type SkillsAction =
  | { type: "ADD_CATEGORY" }
  | { type: "UPDATE_CATEGORY"; categoryId: string; name: string }
  | { type: "DELETE_CATEGORY"; categoryId: string }
  | { type: "ADD_SKILL"; categoryId: string }
  | {
      type: "UPDATE_SKILL";
      categoryId: string;
      skillId: string;
      field: keyof Skill;
      value: string;
    }
  | { type: "DELETE_SKILL"; categoryId: string; skillId: string }
  | { type: "REORDER_CATEGORIES"; fromIndex: number; toIndex: number }
  | {
      type: "REORDER_SKILLS";
      categoryId: string;
      fromIndex: number;
      toIndex: number;
    };

const createSkillId = () =>
  `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const createCategoryId = () =>
  `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const createNewSkill = (): Skill => ({
  id: createSkillId(),
  name: "",
  level: undefined,
});

const createNewCategory = (): SkillCategory => ({
  id: createCategoryId(),
  name: "",
  skills: [createNewSkill()],
});

const initialState: SkillsState = {
  categories: [
    {
      id: "skill-cat-1",
      name: "Languages and Frameworks",
      skills: [
        { id: "skill-1", name: "JavaScript", level: "Advanced" },
        { id: "skill-2", name: "React", level: "Expert" },
      ],
    },
  ],
};

function skillsReducer(state: SkillsState, action: SkillsAction): SkillsState {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, createNewCategory()],
      };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.categoryId
            ? { ...category, name: action.name }
            : category
        ),
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.categoryId
        ),
      };

    case "ADD_SKILL":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.categoryId
            ? { ...category, skills: [...category.skills, createNewSkill()] }
            : category
        ),
      };

    case "UPDATE_SKILL":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.categoryId
            ? {
                ...category,
                skills: category.skills.map((skill) =>
                  skill.id === action.skillId
                    ? { ...skill, [action.field]: action.value }
                    : skill
                ),
              }
            : category
        ),
      };

    case "DELETE_SKILL":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.categoryId
            ? {
                ...category,
                skills: category.skills.filter(
                  (skill) => skill.id !== action.skillId
                ),
              }
            : category
        ),
      };

    case "REORDER_CATEGORIES": {
      const newCategories = [...state.categories];
      const [movedCategory] = newCategories.splice(action.fromIndex, 1);
      newCategories.splice(action.toIndex, 0, movedCategory);
      return { ...state, categories: newCategories };
    }

    case "REORDER_SKILLS": {
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.categoryId
            ? (() => {
                const newSkills = [...category.skills];
                const [movedSkill] = newSkills.splice(action.fromIndex, 1);
                newSkills.splice(action.toIndex, 0, movedSkill);
                return { ...category, skills: newSkills };
              })()
            : category
        ),
      };
    }

    default:
      return state;
  }
}

export const useSkillsReducer = () => {
  const [state, dispatch] = useReducer(skillsReducer, initialState);

  return {
    state,
    actions: {
      addCategory: () => dispatch({ type: "ADD_CATEGORY" }),
      updateCategory: (categoryId: string, name: string) =>
        dispatch({ type: "UPDATE_CATEGORY", categoryId, name }),
      deleteCategory: (categoryId: string) =>
        dispatch({ type: "DELETE_CATEGORY", categoryId }),
      addSkill: (categoryId: string) =>
        dispatch({ type: "ADD_SKILL", categoryId }),
      updateSkill: (
        categoryId: string,
        skillId: string,
        field: keyof Skill,
        value: string
      ) =>
        dispatch({ type: "UPDATE_SKILL", categoryId, skillId, field, value }),
      deleteSkill: (categoryId: string, skillId: string) =>
        dispatch({ type: "DELETE_SKILL", categoryId, skillId }),
      reorderCategories: (fromIndex: number, toIndex: number) =>
        dispatch({ type: "REORDER_CATEGORIES", fromIndex, toIndex }),
      reorderSkills: (categoryId: string, fromIndex: number, toIndex: number) =>
        dispatch({ type: "REORDER_SKILLS", categoryId, fromIndex, toIndex }),
    },
  };
};
