/* eslint-disable no-unused-vars */
import { Button, Select, useMantineColorScheme } from "@mantine/core";
import useStore from "../store";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { createSlug, uploadFile } from "../utils";
import { Link, link, RichTextEditor } from "@mantine/tiptap";
import { IconColorPicker } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import { useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript, { Subscript } from "@tiptap/extension-subscript";
import { BubbleMenu } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import { TextInput } from "@mantine/core";
import { BiImages } from "react-icons/bi";
import Loading from "../components/Loading";
import { Toaster, toast } from "sonner";
import { useCreatePost } from "../hooks/post-hook";

const WritePost = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);
  const { isPending, mutate } = useCreatePost(toast, toggle, user?.token);
  const [category, setCategory] = useState("NEWS");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const theme = colorScheme === "dark";

  let editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write article here..." }),
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const handleSubmit = async () => {
    if (!fileURL || !category || !title) {
      toast.error("All Fields Required");
      return;
    }

    const slug = createSlug(title)
    mutate({title,slug,cat:category,img:fileURL,desc:editor.getHTML()})
  };

  useEffect(() => {
    file && uploadFile(setFileURL, file);
  }, [file]);

  return (
    <>
      <RichTextEditor editor={editor}>
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-5 mb-8">
          <TextInput
            withAsterisk
            label="Post Title"
            className="w-full flex-1"
            placeholder="Post Title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select
            label="Category"
            defaultValue={"NEWS"}
            placeholder="Pick Category"
            data={["NEWS", "SPORTS", "CODING", "EDUCATION", "FASHION"]}
            onChange={(val) => setCategory(val)}
          />

          <label
            className="flex items-center gap-1 text-base cursor-pointer"
            htmlFor="imgUpload"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <BiImages />
            <span>Post IMage</span>
          </label>
        </div>

        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}

        <RichTextEditor.Toolbar sticky stickyOffset={20}>
          <RichTextEditor.ColorPicker
            colors={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={false}>
              <IconColorPicker size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.UnsetColor />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          {/* <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup> */}
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content className="py-8" />
      </RichTextEditor>

      <div className="w-full flex items-end justify-end mt-6">
        <Button
          className={theme ? "bg-blue-600" : "bg-black"}
          onClick={() => handleSubmit()}
        >
          Submit Post
        </Button>
      </div>

      <Loading visible={isPending} />
      <Toaster richColors></Toaster>
    </>
  );
};

export default WritePost;
