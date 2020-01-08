<?php

namespace App\Controller;

use App\Entity\Todo;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Rest\Route("/api")
 */
class TodoController extends AbstractController
{

    /** @var EntityManagerInterface */
    private $em;

    /** @var SerializerInterface */
    private $serializer;

    public function __construct(EntityManagerInterface $em, SerializerInterface $serializer){
        $this->em = $em;
        $this->serializer = $serializer;
    }

    /**
     * @throws BadRequestHttpException
     *
     * @Rest\Post("/todos", name="createTodo")
     */
    public function createAction(Request $request): JsonResponse
    {
        $name = $request->request->get('name');
        if (empty($name)) {
            throw new BadRequestHttpException('name cannot be empty');
        }
        $todo = new Todo();
        $todo->setName($name);
        $todo->setDone(false);
        $this->em->persist($todo);
        $this->em->flush();
        $data = $this->serializer->serialize($todo, JsonEncoder::FORMAT);

        return new JsonResponse($data, Response::HTTP_CREATED, [], true);
    }

    /**
     * @Rest\Get("/todos", name="findAllTodos")
     */
    public function findAllAction(): JsonResponse
    {
        $todos = $this->em->getRepository(Todo::class)->findBy([], ['id' => 'DESC']);
        $data = $this->serializer->serialize($todos, JsonEncoder::FORMAT);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    /**
     * @Rest\Delete("/todos/{id}", name="deleteTodod")
     */
    public function deleteTodo($id): Response 
    {
        $todo = $this->em->getRepository(Todo::class)->find($id);
        $this->em->remove($todo);
        $this->em->flush();

        return new Response("", 200);
    }
}
