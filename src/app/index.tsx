import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Moon, Sun, XCircle } from "@/components/Icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { trpc } from "@/utils/trpc";
import { Image } from "expo-image";
import { cssInterop } from "nativewind";
import React from "react";
import { Platform, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Typo from "~/components/ui/typography";
import { Divider } from "@/components/ui/divider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Home = () => {
  const { toggleColorScheme, colorScheme } = useColorScheme();
  const [posts, { refetch }] = trpc.allPosts.useSuspenseQuery();
  const { mutateAsync } = trpc.createPost.useMutation();
  const { mutateAsync: deletePost } = trpc.removePost.useMutation({});
  const insets = useSafeAreaInsets();
  const [open, setOpen] = React.useState(false);
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <ScrollView
      style={{
        marginTop: insets.top,
        marginBottom: insets.bottom,
      }}
      className="container mx-auto bg-background px-2 "
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row sticky justify-end z-10 items-center bg-secondary w-full p-4 rounded-full top-4 gap-4">
        <Pressable
          onPress={async () => {
            // TODO: Change to dynamic
            await mutateAsync(1);
            refetch();
          }}
          className="hover:scale-110 ease-in transition-all"
        >
          <Typo.Large>Create post</Typo.Large>
        </Pressable>
        <Pressable
          className=" hover:scale-110  ease-in transition-all"
          onPress={toggleColorScheme}
        >
          {colorScheme === "light" ? (
            <Sun className="color-foreground" />
          ) : (
            <Moon className="color-foreground" />
          )}
        </Pressable>
      </View>

      <View className="flex-1 gap-4 center max-w-[750px] mx-auto">
        <View className="py-12 justify-center align-center gap-4">
          <Typo.H1>Cool Hero text</Typo.H1>
          <Typo.Lead>
            Et laborum aliqua do magna et in velit nulla dolore do voluptate
            commodo ullamco ullamco deserunt. Non sunt laborum consectetur
            voluptate pariatur reprehenderit mollit irure voluptate velit
          </Typo.Lead>
          <Divider className="bg-gray-200 rounded" orientation="horizontal" />
          <View className="flex-row">
            <Button
              variant="default"
              className=" transition-all active:bg-secondary"
            >
              <Typo.P>See more</Typo.P>
            </Button>
          </View>
          <Label nativeID="test">aasdsadsdas</Label>
          <Input
            placeholder="Write some stuff..."
            aria-labelledby="textareaLabel"
          />
        </View>
        <View className="flex-wrap gap-4 flex-row mb-5 ">
          {posts.map((p) => {
            return (
              <Card key={p.id} className="flex-1 bg-card min-w-48">
                <Pressable
                  className="absolute top-2 right-2 z-10"
                  onPress={async () => {
                    await deletePost(p.id);
                    refetch();
                  }}
                >
                  <XCircle className="color-foreground" />
                </Pressable>
                <CardHeader>
                  <Typo.Large>{p.title}</Typo.Large>
                </CardHeader>
                <CardContent>
                  <Typo.P>{p.content}</Typo.P>
                </CardContent>
              </Card>
            );
          })}
        </View>

        <View className="py-8 mt-8  native:flex-col web:flex-row web:flex-wrap  gap-4 ">
          <NImage
            className="flex-1 rounded-lg border-r-input hover:scale-110 transition-all object-cover aspect-square"
            source={{
              blurhash: Platform.OS !== "android" ? blurhash : null,
              uri: "https://images.unsplash.com/photo-1710880694633-7a79f1c7722e?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
          <Typo.P className=" flex-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, quis
            vitae ea repellat quam voluptas eius porro. Quis ad tempora magni
            voluptates, in consequatur praesentium, laudantium nihil nesciunt
            nulla cumque.
          </Typo.P>
        </View>
        <View className="pb-8 my-8 web:flex-row native:flex-col web:flex-wrap gap-4 ">
          <Typo.P className="flex-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, quis
            vitae ea repellat quam voluptas eius porro. Quis ad tempora magni
            voluptates, in consequatur praesentium, laudantium nihil nesciunt
            nulla cumque.
          </Typo.P>
          <NImage
            className="flex-1 rounded-lg border-r-input hover:scale-110 transition-transform object-cover aspect-square"
            source={{
              blurhash: Platform.OS !== "android" ? blurhash : null,
              uri: "https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const NImage = cssInterop(Image, {
  className: "style",
});

export default Home;
