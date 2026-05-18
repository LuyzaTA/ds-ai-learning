import type { Section, Module, Lesson, ContentBlock } from '@/types/curriculum';
import type { SectionTranslation, ModuleTranslation, LessonTranslation, BlockTranslation } from '@/types/curriculum-i18n';

function localizeBlock(block: ContentBlock, t: BlockTranslation): ContentBlock {
  switch (block.type) {
    case 'text':
      return { ...block, content: t.content ?? block.content };
    case 'eli5':
      return { ...block, content: t.content ?? block.content };
    case 'summary':
      return { ...block, content: t.content ?? block.content };
    case 'callout':
      return { ...block, title: t.title ?? block.title, content: t.content ?? block.content };
    case 'keyTakeaways':
      return { ...block, items: t.items ?? block.items };
    case 'math':
      return { ...block, caption: t.caption ?? block.caption };
    case 'code':
      return { ...block, caption: t.caption ?? block.caption };
    case 'diagram':
      return { ...block, title: t.title ?? block.title, lines: t.lines ?? block.lines };
    case 'compare':
      return {
        ...block,
        title: t.compareTitle ?? block.title,
        left: {
          label: t.left?.label ?? block.left.label,
          items: t.left?.items ?? block.left.items,
        },
        right: {
          label: t.right?.label ?? block.right.label,
          items: t.right?.items ?? block.right.items,
        },
      };
    case 'quiz':
      return {
        ...block,
        title: t.quizTitle ?? block.title,
        questions: block.questions.map((q, i) => ({
          ...q,
          question:    t.questions?.[i]?.question    ?? q.question,
          options:     t.questions?.[i]?.options     ?? q.options,
          explanation: t.questions?.[i]?.explanation ?? q.explanation,
        })),
      };
    default:
      return block;
  }
}

function localizeLesson(lesson: Lesson, t: LessonTranslation): Lesson {
  return {
    ...lesson,
    title:       t.title       ?? lesson.title,
    description: t.description ?? lesson.description,
    blocks: lesson.blocks.map((block, i) => {
      const bt = t.blocks?.[i];
      return bt ? localizeBlock(block, bt) : block;
    }),
  };
}

function localizeModule(mod: Module, t: ModuleTranslation): Module {
  return {
    ...mod,
    title:       t.title       ?? mod.title,
    description: t.description ?? mod.description,
    lessons: mod.lessons.map(lesson => {
      const lt = t.lessons?.[lesson.id];
      return lt ? localizeLesson(lesson, lt) : lesson;
    }),
  };
}

export function localizeSection(section: Section, t: SectionTranslation): Section {
  return {
    ...section,
    title:           t.title           ?? section.title,
    description:     t.description     ?? section.description,
    longDescription: t.longDescription ?? section.longDescription,
    tags:            t.tags            ?? section.tags,
    modules: section.modules.map(mod => {
      const mt = t.modules?.[mod.id];
      return mt ? localizeModule(mod, mt) : mod;
    }),
  };
}
