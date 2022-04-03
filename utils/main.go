package main

import (
	"flag"
	"fmt"
	"image"
	"image/color"
	"image/jpeg"
	_ "image/jpeg"
	"image/png"
	"io"
	"log"
	"math/rand"
	"os"
	"path/filepath"
	"strings"
	"sync"

	"github.com/disintegration/imaging"
)

type Command interface {
	Run()
}

type ConfigScale struct {
	File string
	Name string
}

func Random(from, to float64) float64 {
	return rand.Float64()*(to-from) + from
}

func RandomScale(what int, from, to float64) int {
	r := Random(from, to)
	if rand.Int()%2 == 0 {
		r = 1 / r
	}
	return int(float64(what) * r)
}

func Save(s string, to io.Writer, img image.Image) {
	switch s {
	case "png":
		png.Encode(to, img)
	case "jpg", "jpeg":
		jpeg.Encode(to, img, nil)
	default:
		panic(s)
	}
}

func Glue(images []image.Image) image.Image {
	sprite := image.NewRGBA(image.Rect(0, 0, len(images)*images[0].Bounds().Dx(), images[0].Bounds().Dy()))
	group := new(sync.WaitGroup)
	group.Add(len(images))
	for i, img := range images {
		go func(i int, img image.Image) {
			width := img.Bounds().Dx()
			height := img.Bounds().Dy()
			for y := 0; y < height; y++ {
				for x := 0; x < width; x++ {
					sprite.Set(width*i+x, y, img.At(x, y))
				}
			}
			group.Done()
		}(i, img)
	}
	group.Wait()
	return sprite
}

func (config ConfigScale) Run() {
	flag.StringVar(&config.File, "file", "output/pause0", "Prefix")
	flag.StringVar(&config.Name, "name", "output2/pause", "New prefix")
	flag.Parse()
	for _, file := range []string{
		"pause",
		"play",
		"stop",
		"io",
		"forwardstep",
		"backwardstep",
		"next",
		"open",
		"prev",
		"forwardrewind",
		"backwardrewind",
	} {
		config.File = fmt.Sprint("dataset/", file, 0)
		config.Name = fmt.Sprint("dataset/", file)
		err := filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
			matched := strings.HasPrefix(path, filepath.Clean(config.File))
			if !info.IsDir() && matched {
				file, err := os.Open(path)
				log.Println(path, matched)
				if err != nil {
					log.Fatalln(err)
				}
				img, s, err := image.Decode(file)
				if err != nil {
					log.Fatalln(err)
				}
				file.Close()
				for i := 1; i < 5; i++ {
					newName := config.Name + fmt.Sprint(i) + strings.TrimPrefix(path, filepath.Clean(config.File))
					output, err := os.Create(filepath.Clean(newName))
					if err != nil {
						log.Fatalln(err)
					}
					newImage := imaging.Resize(img, img.Bounds().Max.X, RandomScale(img.Bounds().Max.Y, 1.1, 1.3), imaging.CatmullRom)
					Save(s, output, imaging.Rotate(newImage, Random(-3, 3), color.White))
					output.Close()
				}
			}
			return nil
		})
		if err != nil {
			log.Fatal(err)
		}
	}
}

type SubImage interface {
	image.Image
	SubImage(image.Rectangle) image.Image
}

func GlueExplosion(input string, output string) {
	count := 24
	images := make([]image.Image, count)
	for i := 0; i < count; i++ {
		var err error
		images[i], err = imaging.Open(fmt.Sprintf("../src/images/%s%0.5d.png", input, i+1))
		if err != nil {
			panic(err)
		}
	}
	fmt.Println(images[0].Bounds())
	sprite := Glue(images)
	imaging.Save(sprite, output)
}

func main() {
	GlueExplosion("green_explosion/green_explosion_", "firework_green.png")
	GlueExplosion("red_explosion/red_snakeplosion_", "firework_red.png")
	GlueExplosion("blue_explosion/bluspark_", "firework_blue.png")
}
